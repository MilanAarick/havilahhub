"use client";

import { Question, QuestionOption, Test } from "@prisma/client";
import QuestionComponent from "./question-component";
import { useState } from "react";
import { calculateScore } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function TestComponent({
  test,
}: {
  test: Test & { questions: (Question & { options: QuestionOption[] })[] };
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    const calculatedScore = calculateScore(test.questions, answers);
    setScore(calculatedScore);
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
      <Button onClick={handleSubmit} className="mt-6">
        Submit Test
      </Button>
      {score !== null && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Test Results</h3>
          <p>Your score: {score}%</p>
          {test.passingScore && (
            <p>
              {score >= test.passingScore
                ? "Congratulations! You passed the test."
                : "Unfortunately, you didn't pass the test. Keep practicing!"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
