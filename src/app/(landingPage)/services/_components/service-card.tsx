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
import { ChevronDown, ChevronUp, ChevronRight, ArrowRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRouter } from "next/navigation";
import { getServiceTitle } from "@/constants/global";

type Props = {
  service: {
    id: string;
    title: string;
    description: string;
    details: string;
    image: StaticImageData;
    type: string;
  };
};

const ServiceCard = ({ service }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const Content = () => (
    <div className="px-4">
      <p className="text-gray-600">{service.details}</p>

      <div className="flex items-center gap-2 mt-6">
        <Button variant="outline" className="w-full">
          Free Consultation
        </Button>
        <Button
          onClick={() =>
            router.push(`/content-library/curriculum?filter=${service.type}`)
          }
          variant="default"
          className="w-full"
        >
          Pay Now
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id={service.id}
      className="max-w-[400px] h-full"
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
        <CardContent>
          <CardDescription>{service.description}</CardDescription>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="w-full"
          >
            More Info <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      {isDesktop ? (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{service.title}</DialogTitle>
            </DialogHeader>
            <Content />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={onOpenChange}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{service.title}</DrawerTitle>
            </DrawerHeader>
            <Content />
          </DrawerContent>
        </Drawer>
      )}
    </motion.div>
  );
};

export default ServiceCard;
