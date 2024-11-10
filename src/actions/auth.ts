"use server";

import { client } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function checkAndRegisterDevice({
  userId,
  browserName,
  osName,
  deviceId,
}: {
  userId: string;
  browserName: string;
  osName: string;
  deviceId: string;
}) {
  try {
    // Get IP address
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const { ip: ipAddress } = await ipResponse.json();

    // Get geo information
    const geoResponse = await fetch(`http://ip-api.com/json/${ipAddress}`);
    const { city: geoCity, country: geoCountry } = await geoResponse.json();

    // Check if device exists for user
    const existingDevice = await client.userDevice.findUnique({
      where: {
        userId_deviceId: {
          userId,
          deviceId,
        },
      },
    });

    if (!existingDevice) {
      // Register new device
      await client.userDevice.create({
        data: {
          userId,
          deviceId,
          browserName,
          osName,
          ipAddress,
          geoCity,
          geoCountry,
          lastSeen: new Date(),
        },
      });

      // Get user email
      const user = await client.user.findUnique({
        where: { clerkId: userId },
      });

      if (user?.email) {
        // Send email notification
        await resend.emails.send({
          from: "oloyedetimi@gmail.com",
          to: user.email,
          subject: "New Device Login Detected | Havilah Learning Hub",
          html: `
           <body
              style="
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
              "
            >
              <table role="presentation" style="width: 100%; border-collapse: collapse">
                <tr>
                  <td align="center" style="padding: 40px 0">
                    <table
                      role="presentation"
                      style="
                        width: 600px;
                        border-collapse: collapse;
                        background-color: #ffffff;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                      "
                    >
                      <!-- Header -->
                      <tr>
                        <td
                          style="
                            padding: 40px 30px;
                            background-color: #01869d;
                            text-align: center;
                          "
                        >
                          <h1 style="color: #ffffff; font-size: 28px; margin: 0">
                            Havilah Learning Hub
                          </h1>
                        </td>
                      </tr>
                      <!-- Content -->
                      <tr>
                        <td style="padding: 40px 30px">
                          <h2 style="color: #333333; font-size: 24px; margin-top: 0">
                            New Device Login Detected
                          </h2>
                          <p style="color: #666666; font-size: 16px; line-height: 1.5">
                            Hello ${user.firstname},
                          </p>
                          <p style="color: #666666; font-size: 16px; line-height: 1.5">
                            We noticed a login to your Havilah Learning Hub account from a
                            new device. Here are the details:
                          </p>
                          <table
                            role="presentation"
                            style="
                              width: 100%;
                              border-collapse: collapse;
                              margin-bottom: 20px;
                            "
                          >
                            <tr>
                              <td style="padding: 10px; border-bottom: 1px solid #eeeeee">
                                <strong style="color: #333333">Date &amp; Time:</strong>
                              </td>
                              <td style="padding: 10px; border-bottom: 1px solid #eeeeee">
                                ${new Date().toLocaleString()}
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 10px; border-bottom: 1px solid #eeeeee">
                                <strong style="color: #333333">Device:</strong>
                              </td>
                              <td style="padding: 10px; border-bottom: 1px solid #eeeeee">
                                ${browserName}
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 10px; border-bottom: 1px solid #eeeeee">
                                <strong style="color: #333333">IP:</strong>
                              </td>
                              <td style="padding: 10px; border-bottom: 1px solid #eeeeee">
                                ${ipAddress}
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 10px; border-bottom: 1px solid #eeeeee">
                                <strong style="color: #333333">Location:</strong>
                              </td>
                              <td style="padding: 10px; border-bottom: 1px solid #eeeeee">
                                ${geoCity}, ${geoCountry}
                              </td>
                            </tr>
                          </table>
                          <p style="color: #666666; font-size: 16px; line-height: 1.5">
                            If this was you, no further action is needed. If you don't
                            recognize this activity, please secure your account
                            immediately by following these steps:
                          </p>
                          <ol style="color: #666666; font-size: 16px; line-height: 1.5">
                            <li>Review your account activity</li>
                            <li>Change your password</li>
                          </ol>
                          <a
                            href="#"
                            style="
                              display: inline-block;
                              background-color: #01869d;
                              color: #ffffff;
                              text-decoration: none;
                              padding: 12px 20px;
                              border-radius: 4px;
                              font-weight: bold;
                              margin-top: 20px;
                            "
                            >Secure Your Account</a
                          >
                        </td>
                      </tr>
                      <!-- Social Media Links -->
                      <tr>
                        <td
                          style="
                            padding: 20px 30px;
                            background-color: #f8f8f8;
                            text-align: center;
                          "
                        >
                          <p style="color: #666666; font-size: 16px; margin-bottom: 10px">
                            Connect with us:
                          </p>
                          <table
                            role="presentation"
                            style="width: 100%; border-collapse: collapse"
                          >
                            <tr>
                              <td align="center">
                                <a
                                  href="https://www.linkedin.com/"
                                  target="_blank"
                                  style="
                                    text-decoration: none;
                                    display: inline-block;
                                    margin: 0 10px;
                                  "
                                >
                                  <img
                                    src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/linkedin.svg"
                                    alt="LinkedIn"
                                    style="width: 32px; height: 32px"
                                  />
                                </a>
                                <a
                                  href="https://www.facebook.com/"
                                  target="_blank"
                                  style="
                                    text-decoration: none;
                                    display: inline-block;
                                    margin: 0 10px;
                                  "
                                >
                                  <img
                                    src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/facebook.svg"
                                    alt="Facebook"
                                    style="width: 32px; height: 32px"
                                  />
                                </a>
                                <a
                                  href="https://www.instagram.com/"
                                  target="_blank"
                                  style="
                                    text-decoration: none;
                                    display: inline-block;
                                    margin: 0 10px;
                                  "
                                >
                                  <img
                                    src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/instagram.svg"
                                    alt="Instagram"
                                    style="width: 32px; height: 32px"
                                  />
                                </a>
                                <a
                                  href="https://www.youtube.com/"
                                  target="_blank"
                                  style="
                                    text-decoration: none;
                                    display: inline-block;
                                    margin: 0 10px;
                                  "
                                >
                                  <img
                                    src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/youtube.svg"
                                    alt="YouTube"
                                    style="width: 32px; height: 32px"
                                  />
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <!-- Footer -->
                      <tr>
                        <td
                          style="
                            padding: 30px;
                            background-color: #f8f8f8;
                            text-align: center;
                          "
                        >
                          <p style="color: #999999; font-size: 14px; margin: 0">
                            This is an automated message from Havilah Learning Hub. Please
                            do not reply to this email.
                          </p>
                          <p style="color: #999999; font-size: 14px; margin: 10px 0 0">
                            © 2023 Havilah Learning Hub. All rights reserved.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          `,
        });
      }

      return { isNewDevice: true };
    }

    // Update last seen for existing device
    await client.userDevice.update({
      where: {
        userId_deviceId: {
          userId,
          deviceId,
        },
      },
      data: {
        lastSeen: new Date(),
      },
    });

    return { isNewDevice: false };
  } catch (error) {
    console.error("Device registration error:", error);
    throw new Error("Failed to process device registration");
  }
}

export async function registerDeviceOnSignup({
  userId,
  browserName,
  osName,
  deviceId,
}: {
  userId: string;
  browserName: string;
  osName: string;
  deviceId: string;
}) {
  try {
    // Get IP address
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const { ip: ipAddress } = await ipResponse.json();

    // Get geo information
    const geoResponse = await fetch(`http://ip-api.com/json/${ipAddress}`);
    const { city: geoCity, country: geoCountry } = await geoResponse.json();

    // Register device
    await client.userDevice.create({
      data: {
        userId,
        deviceId,
        browserName,
        osName,
        ipAddress,
        geoCity,
        geoCountry,
        lastSeen: new Date(),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Device registration error:", error);
    // We don't throw here since this is part of signup - we don't want to block signup if device registration fails
    return { success: false };
  }
}
