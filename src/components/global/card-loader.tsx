import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CardLoader: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card
          key={index}
          className="w-full h-[250px] bg-gray-900 overflow-hidden relative"
        >
          <CardHeader className="space-y-2">
            <div className="flex justify-between items-start">
              <Skeleton className="h-6 w-6 rounded-full bg-gray-700" />
              <Skeleton className="h-4 w-16 bg-gray-700" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-3/4 bg-gray-700" />
            <Skeleton className="h-4 w-full bg-gray-700" />
            <Skeleton className="h-4 w-2/3 bg-gray-700" />
          </CardContent>
          <CardFooter className="flex justify-between items-center absolute bottom-4 left-4 right-4">
            <Skeleton className="h-4 w-20 bg-gray-700" />
            <Skeleton className="h-9 w-16 bg-gray-700" />
          </CardFooter>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gray-800 opacity-50 rounded-tl-full" />
        </Card>
      ))}
    </div>
  );
};

export default CardLoader;
