"use client";

import { useEffect, useState } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Question, QuestionType, QuestionOption } from "@prisma/client";

export default function QuestionComponent({
  question,
  index,
  onAnswerChange,
}: {
  question: Question & { options: QuestionOption[] };
  index: number;
  onAnswerChange: (answer: string) => void;
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [theoryAnswer, setTheoryAnswer] = useState("");

  useEffect(() => {
    if (question.type === QuestionType.MULTIPLE_CHOICE) {
      onAnswerChange(selectedOption || "");
    } else {
      onAnswerChange(theoryAnswer);
    }
  }, [selectedOption, theoryAnswer, question.type]);

  return (
    <div className="border p-4 rounded-lg">
      <h3 className="font-semibold mb-2">Question {index}</h3>
      <p className="mb-4">{question.questionText}</p>
      {question.questionImage && (
        <img
          src={question.questionImage}
          alt={`Question ${index}`}
          className="mb-4 max-w-full h-auto"
        />
      )}
      {question.type === QuestionType.MULTIPLE_CHOICE ? (
        <RadioGroup
          value={selectedOption || ""}
          onValueChange={setSelectedOption}
          className="space-y-2"
        >
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id}>{option.optionText}</Label>
            </div>
          ))}
        </RadioGroup>
      ) : (
        <Textarea
          value={theoryAnswer}
          onChange={(e) => setTheoryAnswer(e.target.value)}
          placeholder="Enter your answer here"
          className="w-full mt-2"
        />
      )}
    </div>
  );
}
