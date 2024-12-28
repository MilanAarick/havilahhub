"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { Test } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";

type Props = {
  test: any;
};

const TestPage = ({ test }: Props) => {
  const user = useUser();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState((test?.timeLimit ?? 0) * 60); // Convert minutes to seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setShowResult(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentQuestion = test?.questions?.[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const isCorrect = currentQuestion.options.find(
      (option: any) => option.optionText === selectedAnswer
    )?.isCorrect;

    if (isCorrect) {
      setScore((prevScore) => prevScore + currentQuestion.points);
    }

    if (currentQuestionIndex < test?.questions?.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const calculatePercentageScore = () => {
    const totalPossibleScore = test?.questions?.reduce(
      (sum: any, question: any) => sum + question.points,
      0
    );
    return (score / totalPossibleScore) * 100;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // useEffect(() => {
  //   if (showResult) {
  //     mutate();
  //     if (calculatePercentageScore() >= test?.passingScore) {
  //       confetti({
  //         particleCount: 100,
  //         spread: 70,
  //         origin: { y: 0.6 },
  //       });
  //     }
  //   }
  // }, [showResult]);

  const progressWidth = () => {
    const calculated = (currentQuestionIndex / test.questions.length) * 100;

    return calculated;
  };

  if (showResult) {
    const percentageScore = calculatePercentageScore();
    const passed = percentageScore >= test?.passingScore;

    return (
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold mb-4">
            Your Score: {percentageScore.toFixed(2)}%
          </p>
          <Progress
            value={percentageScore}
            className="w-full h-4 mb-4 bg-gray-200"
          />
          {passed ? (
            <p className="text-green-600 font-semibold">
              Congratulations! You passed the test!
            </p>
          ) : (
            <p className="text-red-600 font-semibold">
              Unfortunately, you did not pass the test. Keep practicing!
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{test.title}</CardTitle>
          <CardDescription>{test.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="font-semibold">
              Time Remaining: {formatTime(timeLeft)}
            </p>
            <Progress
              value={progressWidth()}
              className="w-full h-2 bg-gray-200"
            />
          </div>
          <h2 className="text-xl font-bold mb-4">
            Question {currentQuestionIndex + 1} of {test.questions.length}
          </h2>
          <p className="mb-4">{currentQuestion.questionText}</p>
          <RadioGroup
            value={selectedAnswer || ""}
            onValueChange={handleAnswerSelect}
          >
            {currentQuestion.options.map((option: any) => (
              <div
                key={option.order}
                className="flex items-center space-x-2 mb-2"
              >
                <RadioGroupItem
                  value={option.optionText}
                  id={`option-${option.order}`}
                />
                <Label htmlFor={`option-${option.order}`}>
                  {option.optionText}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button onClick={handleNextQuestion} disabled={!selectedAnswer}>
            {currentQuestionIndex < test.questions.length - 1
              ? "Next Question"
              : "Finish Test"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TestPage;
