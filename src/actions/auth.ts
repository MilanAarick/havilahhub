"use server";

import { client } from "@/lib/prisma";

const calculateReferralPoints = (referralType: string): number => {
  switch (referralType.toLowerCase()) {
    case "tutoring":
      return 10;
    case "writing":
      return 5;
    default:
      return 0;
  }
};

export const onSignUpUser = async (
  data: {
    firstname: string;
    lastname: string;
    clerkId: string;
    image: string;
    email: string;
    referralCode: string;
  },
  referredBy: string | null,
  referralType: string | null
) => {
  try {
    // Start a transaction to ensure all operations succeed or fail together

    let referringUser = null;

    // Only look up referring user if a referral code was provided
    if (referredBy) {
      referringUser = await client.user.findUnique({
        where: {
          referralCode: referredBy,
        },
      });

      // Only throw error if invalid code was provided
      if (!referringUser) {
        throw new Error("Invalid referral code");
      }
    }

    // Create the new user
    const createdUser = await client.user.create({
      data: {
        ...data,
        // Only set referredById if we found a valid referring user
        ...(referringUser && { referredById: referringUser.id }),
      },
    });

    // Only handle referral points if we have both a valid referral and referral type
    if (referringUser && referralType) {
      const pointsToAdd = calculateReferralPoints(referralType);

      if (pointsToAdd > 0) {
        await client.user.update({
          where: {
            id: referringUser.id,
          },
          data: {
            points: {
              increment: pointsToAdd,
            },
          },
        });

        //  await tx.activityLog.create({
        //    data: {
        //      userId: referringUser.id,
        //      action: "REFERRAL_BONUS",
        //      description: `Earned ${pointsToAdd} points for referring a ${referralType} client`,
        //      pointsEarned: pointsToAdd,
        //    },
        //  });
      }
    }

    if (createdUser) {
      return {
        status: 200,
        message: "User successfully created",
        data: createdUser,
      };
    }

    return {
      status: 400,
      message: "User could not be created! Try again",
    };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    if (error instanceof Error && error.message === "Invalid referral code") {
      return {
        status: 400,
        message: "Invalid referral code",
      };
    }
    return {
      status: 400,
      message: "Something went wrong! Try again",
    };
  }
};

export const onGetUser = async (clerkId: string | undefined) => {
  try {
    const user = await client.user.findUnique({
      where: {
        clerkId,
      },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        image: true,
        referralCode: true,
        referredBy: true,
        points: true,
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
    console.log({ error });
    return {
      status: 400,
      message: "Something went wrong! Try again",
    };
  }
};
