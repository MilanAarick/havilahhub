"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";
import { User } from "@prisma/client";
import { toast } from "sonner";
type Props = {
  user: Partial<User>;
};

const ReferralTabs = ({ user }: Props) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText("sssfsssvs")
      .then(() => toast.success("Link copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
  };
  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>View Referral Links</CardTitle>
          <CardDescription>
            View your unique links for writing and tutoring referrals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="writing" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="writing">Writing</TabsTrigger>
              <TabsTrigger value="tutoring">Tutoring</TabsTrigger>
            </TabsList>
            <TabsContent value="writing">
              <div className="mt-4">
                <Label htmlFor="referral-link">Your Referral Link:</Label>
                <div className="flex mt-1">
                  <Input
                    id="referral-link"
                    value="ksdkssd"
                    readOnly
                    className="flex-grow"
                  />
                  <Button onClick={copyToClipboard} className="ml-2">
                    <Clipboard className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="w-full">
                  Generate Writing Referral Link
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="tutoring">
              <div className="mt-4">
                <Label htmlFor="referral-link">Your Referral Link:</Label>
                <div className="flex mt-1">
                  <Input
                    id="referral-link"
                    value={"referralLink"}
                    readOnly
                    className="flex-grow"
                  />
                  <Button onClick={copyToClipboard} className="ml-2">
                    <Clipboard className="h-4 w-4" />
                  </Button>
                </div>
                {/* <Button className="w-full">
                  Generate Tutoring Referral Link
                </Button> */}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
};

export default ReferralTabs;
