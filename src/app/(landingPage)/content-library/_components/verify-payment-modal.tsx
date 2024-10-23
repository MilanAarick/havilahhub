"use client";

import { verifyPaystackPayment } from "@/actions/payment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const VerifyPayment = (props: Props) => {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const params = new URLSearchParams(searchParams.toString());
  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ["verify-payment"],
    queryFn: () => verifyPaystackPayment(reference!),
  });

  const onOpenChange = () => {
    if (data?.status) {
      params.delete("reference");
      window.location.href = `/services`;
    }
  };

  useEffect(() => {
    if (isSuccess && data.status) {
    }
  }, [data]);

  return (
    <Dialog open={!!reference} onOpenChange={onOpenChange}>
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
