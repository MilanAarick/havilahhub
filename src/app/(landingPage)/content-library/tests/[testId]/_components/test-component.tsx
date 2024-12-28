"use client";

import { Question, QuestionOption, Test } from "@prisma/client";
import QuestionComponent from "./question-component";
import { useState } from "react";
import { calculateScore } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { addTestAttempt } from "@/actions/learnings";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function TestComponent({
  test,
}: {
  test: Test & { questions: (Question & { options: QuestionOption[] })[] };
}) {
  const user = useUser();
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number>(0);
  const [gettingScore, setGettingScore] = useState<boolean>(false);
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["add-attempt", score],
    mutationFn: async (calcScore: number) =>
      addTestAttempt(user.user?.id!, test.id!, calcScore),
  });

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    //api call to add attempt
    const calculatedScore = calculateScore(test.questions, answers);
    setScore(calculatedScore);
    try {
      setGettingScore(true);
      await mutateAsync(calculatedScore);
      toast.success("Test submitted successfully");
    } catch (error) {
      toast.error("An error occurred while submitting test");
      console.log(error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{test.topic || "Untitled Test"}</h2>
      <p>School Level: {test.schoolLevel}</p>
      <p>Subject Area: {test.subjectArea}</p>
      {test.passingScore && <p>Passing Score: {test.passingScore}%</p>}
      <div className="space-y-6 mt-6">
        {test.questions.map((question, index) => (
          <QuestionComponent
            key={question.id}
            question={question}
            index={index + 1}
            onAnswerChange={(answer) => handleAnswerChange(question.id, answer)}
          />
        ))}
      </div>
      <Button
        onClick={() => {
          handleSubmit();
        }}
        className="mt-6"
      >
        Submit Test {isPending && <Loader2 className="animate-spin ml-2" />}
      </Button>
      {score !== 0 && !isPending && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Test Results</h3>
          <p>Your score: {score}%</p>
        </div>
      )}

      <Dialog open={gettingScore} onOpenChange={() => router.back()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Results</DialogTitle>
          </DialogHeader>

          {isPending ? (
            <div>
              <h1>Calculating your score</h1>
              <Loader2 className="text-blue-500 w-10 h-10 animate-spin" />
            </div>
          ) : (
            <div>
              <h1>You scored</h1>
              <p>{score}%</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
