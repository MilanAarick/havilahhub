"use server";

import { client } from "@/lib/prisma";

import { Prisma, SchoolLevel, SubjectArea } from "@prisma/client";

export const onGetServices = async () => {
  try {
    const services = await client.service.findMany();

    return {
      status: 200,
      message: "Services fetched successfully",
      data: services,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "An error occurred while fetching services",
    };
  }
};

export const getTutoringServices = async (searchTerm?: string) => {
  try {
    const services = await client.tutoringService.findMany({
      where: {
        OR: [
          {
            subject: {
              contains: searchTerm,
              mode: "insensitive" as Prisma.QueryMode,
            },
          },
        ],
      },
    });

    return {
      status: 200,
      message: "Tutoring services fetched successfully",
      data: services,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "An error occurred while fetching tutoring services",
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
          questions: {
            some: {
              questionText: {
                contains: searchTerm,
                mode: "insensitive" as Prisma.QueryMode,
              },
            },
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
