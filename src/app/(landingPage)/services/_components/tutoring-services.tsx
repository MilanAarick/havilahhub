"use client";

import { getTutoringServices } from "@/actions/learnings";
import CardLoader from "@/components/global/card-loader";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import ServiceCard from "../../content-library/_components/service-list";

type Props = {};

const TutoringServices = (props: Props) => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") ?? "";
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["tutoring-services", searchTerm],
    queryFn: () => getTutoringServices(searchTerm),
  });
  return (
    <div>
      <section className="mt-5">
        {isPending ? (
          <CardLoader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data?.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default TutoringServices;
