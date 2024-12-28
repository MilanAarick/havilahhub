import React from "react";
import ServiceSelectionFlow from "../_components/buy-service";
import { onGetServices } from "@/actions/learnings";
import VerifyPayment from "@/app/(landingPage)/content-library/_components/verify-payment-modal";
import { currentUser } from "@clerk/nextjs/server";

type Props = {};

const page = async (props: Props) => {
  const services = await onGetServices();
  const user = await currentUser();
  return (
    <div className="min-h-dvh">
      <ServiceSelectionFlow services={services.data as any} />
      <VerifyPayment userId={user?.id} />
    </div>
  );
};

export default page;
