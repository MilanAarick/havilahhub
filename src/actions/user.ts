"use server";

import { client } from "@/lib/prisma";

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
        id: userId,
      },
      select: {
        services: true,
        activityLogs: true,
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
