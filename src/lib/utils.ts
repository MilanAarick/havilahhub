import { Question, QuestionOption, QuestionType } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateScore(
  questions: (Question & { options: QuestionOption[] })[],
  answers: Record<string, string>
): number {
  let correctAnswers = 0;
  const totalQuestions = questions.length;

  questions.forEach((question) => {
    if (question.type === QuestionType.MULTIPLE_CHOICE) {
      const correctOption = question.options.find((option) => option.isCorrect);
      if (correctOption && answers[question.id] === correctOption.id) {
        correctAnswers++;
      }
    } else {
      // For theory questions, we'll assume they're correct if answered
      // In a real application, you'd need manual grading for theory questions
      if (answers[question.id] && answers[question.id].trim() !== "") {
        correctAnswers++;
      }
    }
  });

  return Math.round((correctAnswers / totalQuestions) * 100);
}
