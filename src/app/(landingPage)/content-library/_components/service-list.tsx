import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Service, ServiceType } from "@prisma/client";
import { formatServiceType, getServiceTitle } from "@/constants/global";
import {
  GraduationCap,
  Loader2,
  Music,
  NotebookText,
  Play,
  Trophy,
} from "lucide-react";
import Paystack from "@paystack/inline-js";
import { useMutation } from "@tanstack/react-query";
import { payWithPaystack } from "@/actions/payment";
import { useClerk, useUser } from "@clerk/nextjs";
import { toast } from "sonner";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const clerk = useUser();
  const [selectedAmount, setSelectedAmount] = useState(0);
  const getIcon = () => {
    if (getServiceTitle(service.type) === "writing") {
      return <NotebookText className="text-green-500" />;
    } else if (getServiceTitle(service.type) === "tutoring") {
      return <GraduationCap className="text-yellow-500" />;
    } else {
      return <GraduationCap className="text-yellow-500" />;
    }
  };

  const getColor = () => {
    if (getServiceTitle(service.type) === "writing") {
      return "bg-green-500";
    } else if (getServiceTitle(service.type) === "tutoring") {
      return "bg-yellow-500";
    } else {
      return "bg-red-500";
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["initialize-paystack"],
    mutationFn: ({ amount, type }: { amount: number; type: ServiceType }) =>
      payWithPaystack(
        amount,
        type,
        clerk?.user?.emailAddresses[0]?.emailAddress
      ),
  });

  const handleBuy = async (amount: number, type: ServiceType) => {
    await mutateAsync(
      { amount, type },
      {
        onSuccess(data, variables, context) {
          toast.success(data.message);
          window.location.href = data.data.authorization_url;
        },
        onError(error, variables, context) {
          toast.error(error.message);
        },
      }
    );
  };
  return (
    <Card className="relative bg-gray-900 text-white overflow-hidden">
      <div
        className={`absolute bottom-0 right-0 w-24 h-24 ${getColor()} opacity-50 rounded-tl-full`}
      />
      <CardHeader className="relative z-10">
        <div className="flex justify-between items-start">
          {getIcon()}
          <Badge
            variant="outline"
            className="text-xs border-0 text-white bg-primary shadow-md"
          >
            {service.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <CardTitle className="text-xl font-bold mb-2 capitalize">
          {formatServiceType(getServiceTitle(service.type))}
        </CardTitle>
        <p className="text-sm text-gray-300">{service.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center relative z-10">
        <p className="text-lg font-semibold">
          &#8358;{service.price.toFixed(2)}
        </p>
        <Button
          variant="outline"
          className="text-primary border-white hover:bg-white hover:text-gray-900"
          onClick={() => handleBuy(service.price * 100, service.type)}
        >
          Buy
          {isPending && <Loader2 className="animate-spin" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
