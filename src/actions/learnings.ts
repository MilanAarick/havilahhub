"use server";

import { client } from "@/lib/prisma";

import { Prisma, SchoolLevel, ServiceType, SubjectArea } from "@prisma/client";

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
  filter: FilterType = "all",
  searchTerm?: string
) => {
  try {
    const skip = (page - 1) * pageSize;
    const serviceTypes = filterToServiceTypes[filter];

    const where = {
      type: {
        in: serviceTypes,
      },
      ...(searchTerm
        ? {
            OR: [
              {
                description: {
                  contains: searchTerm,
                  mode: "insensitive" as Prisma.QueryMode,
                },
              },
              {
                subject: {
                  contains: searchTerm,
                  mode: "insensitive" as Prisma.QueryMode,
                },
              },
            ],
          }
        : {}),
    };

    const [services, totalCount] = await Promise.all([
      client.service.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
      client.service.count({ where }),
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

interface GetTestsParams {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  schoolLevel?: SchoolLevel;
  subjectArea?: SubjectArea;
}

export const onGetTests = async ({
  page = 1,
  pageSize = 10,
  searchTerm,
  schoolLevel,
  subjectArea,
}: GetTestsParams) => {
  try {
    const skip = (page - 1) * pageSize;

    // Build the where clause
    const where: Prisma.TestWhereInput = {};

    // Add search conditions if searchTerm exists
    if (searchTerm) {
      where.OR = [
        {
          description: {
            contains: searchTerm,
            mode: "insensitive" as Prisma.QueryMode,
          },
        },
        {
          title: {
            contains: searchTerm,
            mode: "insensitive" as Prisma.QueryMode,
          },
        },
      ];
    }

    // Add school level filter if provided
    if (schoolLevel) {
      where.schoolLevel = schoolLevel;
    }

    // Add subject area filter if provided
    if (subjectArea) {
      where.subjectArea = subjectArea;
    }

    // Execute queries in parallel
    const [tests, totalCount] = await Promise.all([
      client.test.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        include: {
          questions: {
            include: {
              options: true,
            },
          },
        },
      }),
      client.test.count({ where }),
    ]);

    return {
      status: 200,
      message: "Tests fetched successfully",
      data: tests,
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
      message: "An error occurred while fetching tests",
    };
  }
};

export const onGetSingleTest = async (id: string) => {
  try {
    const test = await client.test.findUnique({
      where: {
        id,
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (test) {
      return {
        status: 200,
        message: "Test fetched successfully",
        data: test,
      };
    }

    return {
      status: 404,
      message: "Test not found",
      data: null,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "An error occurred while fetching test",
      data: null,
    };
  }
};
