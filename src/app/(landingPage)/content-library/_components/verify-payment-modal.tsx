"use client";

import { verifyPaystackPayment } from "@/actions/payment";
import { addToActivityLog } from "@/actions/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

type Props = {
  userId: string | undefined;
};

const VerifyPayment = ({ userId }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const params = new URLSearchParams(searchParams.toString());
  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ["verify-payment"],
    queryFn: () => verifyPaystackPayment(reference!),
    enabled: !!reference,
  });

  const onOpenChange = () => {
    if (data?.status) {
      params.delete("reference");
      router.replace("/home");
    }
  };

  useEffect(() => {
    if (data?.status && isSuccess) {
      const addActivity = async () => {
        try {
          const activity = await addToActivityLog(
            userId,
            `Paid for ${data?.data?.metadata?.serviceType}`,
            data?.data?.metadata.serviceType,
            data?.data?.amount / 100,
            data?.data?.reference
          );

          toast.success("Payment confirmed successfully");
          if (activity.status === 200) {
            router.replace(`/home`);
          }
        } catch (error) {
          toast.error("An error occurred while adding activity log");
          console.log("ADD_ACTIVITY_ERROR", error);
        }
      };

      addActivity();
    }
  }, [data?.status, isSuccess]);

  // useEffect(() => {
  //   console.log(data, isSuccess);
  // }, [data, isSuccess]);

  return (
    <Dialog open={!!reference}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verifying Payment</DialogTitle>
          <DialogDescription>
            Please wait while we verify your payment.{" "}
            <span className="text-primary">Do not close this window.</span>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-8">
          {isPending ? (
            <div className="flex justify-center items-center">
              <Loader2 className="text-blue-500 w-10 h-10 animate-spin" />
            </div>
          ) : data?.status ? (
            <h1 className="text-3xl text-center font-medium font-poppins">
              Payment Verified
            </h1>
          ) : (
            <h1 className="text-3xl text-center font-medium font-poppins text-red-500">
              Payment Verification Failed - {data?.message}
            </h1>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyPayment;
