"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";

type Props = {
  service: {
    id: string;
    title: string;
    description: string;
    details: string;
    image: StaticImageData;
  };
};

const ServiceCard = ({ service }: Props) => {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setExpandedService(expandedService === id ? null : id);
  };
  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <Image
          src={service.image}
          alt={service.title}
          width={300}
          height={200}
          className="w-full object-cover max-h-[200px]"
        />
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription>{service.description}</CardDescription>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => toggleService(service.id)}
            variant="outline"
            className="w-full"
          >
            {expandedService === service.id ? (
              <>
                Less Info <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                More Info <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
        <AnimatePresence>
          {expandedService === service.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="px-6 pb-4"
            >
              <p className="text-gray-600">{service.details}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
