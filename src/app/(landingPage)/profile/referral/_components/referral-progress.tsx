"use client";

import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReferralProgressBarProps {
  points: number;
}

export function ReferralProgressBar({ points }: ReferralProgressBarProps) {
  const progressPoints = () => {
    return (points ?? 0) / 100;
  };

  const progress = progressPoints() * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Referral Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="w-full" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{points} points</span>
          <span>100 points</span>
        </div>
        <p className="text-center text-sm">
          {points === 0
            ? "Start referring to earn points!"
            : points >= 100
              ? "Congratulations! You've reached the maximum points."
              : `${100 - points} more points to reach the maximum!`}
        </p>
      </CardContent>
    </Card>
  );
}
