"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { onGetServices } from "@/actions/learnings";
import { Service } from "@prisma/client";
import ServiceList from "./service-list";
import { Button } from "@/components/ui/button";
import CardLoader from "@/components/global/card-loader";
import { useSearchParams } from "next/navigation";

type FilterType = "all" | "writing" | "tutoring";

const TabsComponent = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") ?? "";
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<FilterType>("all");

  const { data, isPending, isError, error, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["services", filter, page, searchTerm],
      queryFn: () => onGetServices(page, 10, filter, searchTerm),
      placeholderData: keepPreviousData,
    });

  const handleTabChange = (value: FilterType) => {
    setFilter(value);
    setPage(1); // Reset to first page when changing filter
  };

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);
  return (
    <Tabs
      defaultValue="all"
      value={filter}
      onValueChange={(value: string) => handleTabChange(value as FilterType)}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="writing">Havilah Writing</TabsTrigger>
        <TabsTrigger value="tutoring">Havilah Tutoring</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-5 md:mt-8 lg:mt-12">
        {isPending || isFetching ? (
          <CardLoader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data?.map((service) => (
              <ServiceList key={service.id} service={service} />
            ))}
          </div>
        )}
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous Page
          </Button>
          <span>
            Page {page} of {data?.meta?.totalPages ?? 1}
          </span>
          <Button
            onClick={() => {
              if (
                !isPlaceholderData &&
                (data?.meta?.currentPage ?? 0) < (data?.meta?.totalPages ?? 1)
              ) {
                setPage((old) => old + 1);
              }
            }}
            disabled={isPlaceholderData || page === data?.meta?.totalPages}
          >
            Next Page
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TabsComponent;
