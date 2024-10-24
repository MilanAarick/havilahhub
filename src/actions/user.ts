"use server";

import { client } from "@/lib/prisma";
import { ServiceType } from "@prisma/client";

export const onGetUserLearnings = async (userId: string | undefined) => {
  if (!userId) {
    return {
      status: 400,
      message: "User ID is required",
      data: null,
    };
  }
  try {
    const learnings = await client.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        services: true,
        activityLogs: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (learnings) {
      return {
        status: 200,
        message: "User learnings fetched successfully",
        data: learnings,
      };
    }

    return {
      status: 404,
      message: "User learnings not found",
      data: null,
    };
  } catch (error: any) {
    console.log("GET_LEARNINGS_ERROR", error);
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

export const addToActivityLog = async (
  userId: string | undefined,
  detail: string,
  type: ServiceType,
  amount: number,
  referenceId: string
) => {
  try {
    const activity = await client.activityLog.create({
      data: {
        user: { connect: { clerkId: userId } },
        serviceDetail: detail,
        serviceType: type,
        amount,
        referenceId,
      },
    });

    if (activity) {
      return {
        status: 200,
        message: "Activity log created successfully",
        data: null,
      };
    }

    return {
      status: 400,
      message: "Activity log not created",
      data: null,
    };
  } catch (error: any) {
    console.log("ADD_ACTIVITY_LOG_ERROR", error);
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};
