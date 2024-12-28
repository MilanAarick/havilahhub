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
import { TutoringService, ServiceType } from "@prisma/client";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ServiceCardProps {
  service: TutoringService;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const clerk = useUser();
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [id, setId] = useState(0);
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
    mutationFn: ({
      amount,
      type,
      email,
      phone,
    }: {
      amount: number;
      type: ServiceType;
      email: string | undefined;
      phone: string | undefined;
    }) => payWithPaystack(amount, type, email, phone),
  });

  const handleBuy = async (amount: number, type: ServiceType) => {
    await mutateAsync(
      {
        amount,
        type,
        email: clerk?.user?.emailAddresses[0]?.emailAddress,
        phone: "",
      },
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

  const prices = [
    { label: "2 days", price: service.twoDaysPrice },
    { label: "3 days", price: service.threeDaysPrice },
    { label: "5 days", price: service.fiveDaysPrice },
  ];

  return (
    <Card className="relative bg-gray-900 text-white overflow-hidden">
      <div
        className={`absolute bottom-0 right-0 w-24 h-24 ${getColor()} opacity-50 rounded-tl-full`}
      />
      <CardHeader className="relative z-10">
        {/* <div className="flex justify-between items-start">
          {getIcon()}
         
        </div> */}
        <CardTitle className="text-xl font-bold mb-2 capitalize">
          {/* {formatServiceType(getServiceTitle(service.type))} */}
          {service.subject}
        </CardTitle>
        <CardDescription className="text-gray-300 capitalize">
          <Badge
            variant="outline"
            className="text-xs border-0 text-white bg-primary shadow-md"
          >
            {service.type.replace("_", " ").toLowerCase()}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <p>- ₦{service.twoDaysPrice} for 2 days.</p>
        <p>- ₦{service.threeDaysPrice} for 3 days.</p>
        <p>- ₦{service.fiveDaysPrice} for 5 days.</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center relative z-10">
        <p className="text-lg font-semibold">
          {/* &#8358;{service.price.toFixed(2)} */}
        </p>
        <Button
          variant="outline"
          className="text-primary border-white hover:bg-white hover:text-gray-900"
          // onClick={() => handleBuy(service.price * 100, service.type)}
        >
          <Popover>
            <PopoverTrigger>Buy</PopoverTrigger>
            <PopoverContent>
              {prices.map(({ label, price }, i) => (
                <div key={label}>
                  <Button
                    variant="outline"
                    className="text-primary border-white hover:bg-white hover:text-gray-900 hover:bg-secondary w-full"
                    onClick={() => {
                      setId(i);
                      handleBuy(price! * 100, service.type);
                    }}
                  >
                    {label}{" "}
                    {id === i && isPending && (
                      <Loader2 className="animate-spin" />
                    )}
                  </Button>
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
