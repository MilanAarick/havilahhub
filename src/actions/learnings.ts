"use server";

import { client } from "@/lib/prisma";

import { ServiceType } from "@prisma/client";

type FilterType = "all" | "writing" | "tutoring";

const filterToServiceTypes: Record<FilterType, ServiceType[]> = {
  all: Object.values(ServiceType),
  writing: [
    ServiceType.RESEARCH_WRITING,
    ServiceType.BOOK_WRITING,
    ServiceType.BUSINESS_PLAN,
    ServiceType.SOP_WRITING,
  ],
  tutoring: [ServiceType.PERSONALIZED_TUTORING, ServiceType.EXAM_PREPARATION],
};

export const onGetServices = async (
  page = 1,
  pageSize = 10,
  filter: FilterType = "all"
) => {
  try {
    const skip = (page - 1) * pageSize;
    const serviceTypes = filterToServiceTypes[filter];

    const [services, totalCount] = await Promise.all([
      client.service.findMany({
        where: {
          type: {
            in: serviceTypes,
          },
        },
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
      client.service.count({
        where: {
          type: {
            in: serviceTypes,
          },
        },
      }),
    ]);

    return {
      status: 200,
      message: "Services fetched successfully",
      data: services,
      meta: {
        currentPage: page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "An error occurred while fetching services",
    };
  }
};
