import { onGetUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import ReferralTabs from "./_components/referral-tabs";

type Props = {};

const page = async (props: Props) => {
  const user = await currentUser();
  const profileUser = await onGetUser(user?.id);
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Referral Point System</CardTitle>
            <CardDescription>
              Earn points for referrals and be eligible to withdraw when you
              reach 100 points
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Point System:</h3>
                <ul className="list-disc list-inside">
                  <li>Total points needed for withdrawal: 100 points</li>
                  <li>For each tutoring client: 10 points</li>
                  <li>For each writing client: 5 points</li>
                </ul>
              </div>
              <div className="flex justify-between gap-5 items-center">
                <h3 className="text-lg font-semibold mb-2">
                  Your Current Points:
                </h3>
                {/* <Progress value={(points / 100) * 100} className="w-full" /> */}
                <p className="mt-2 text-center">
                  {profileUser?.data?.points} points
                </p>
              </div>
              {profileUser?.data && <ReferralTabs user={profileUser?.data} />}

              {(profileUser?.data?.points ?? 0) >= 100 && (
                <Button className="w-full" variant="default">
                  Withdraw Payment
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
