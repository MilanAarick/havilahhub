"use server";

import { client } from "@/lib/prisma";

export const onSignUpUser = async (data: {
  firstname: string;
  lastname: string;
  id: string;
  image: string;
  email: string;
  referralCode: string;
}) => {
  try {
    const createdUser = await client.user.create({
      data: {
        ...data,
      },
    });

    if (createdUser) {
      return {
        status: 200,
        message: "User successfully created",
        id: createdUser.id,
      };
    }

    return {
      status: 400,
      message: "User could not be created! Try again",
    };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return {
      status: 400,
      message: "Something went wrong! Try again",
    };
  }
};

export const onGetUser = async (clerkId: string) => {
  try {
    const user = await client.user.findUnique({
      where: {
        id: clerkId,
      },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        image: true,
        referralCode: true,
        referredBy: true,
      },
    });

    if (user) {
      return {
        status: 200,
        message: "User data found",
        data: user,
      };
    }

    return {
      status: 400,
      message: "User not found",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      message: "Something went wrong! Try again",
    };
  }
};
