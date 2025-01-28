"use server";

import { PaystackInitialize, PaystackVerify } from "@/constants/global";
import { ServiceType } from "@prisma/client";

import axios from "axios";

export const payWithPaystack = async (
  amount: number,
  type: ServiceType,
  email: string | undefined,
  phone?: string | undefined,
  subjects?: string | undefined
) => {
  try {
    const response = await axios.post(
      `https://api.paystack.co/transaction/initialize`,
      {
        email,
        amount,
        metadata: {
          serviceType: type,
          phone,
          subjects,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    return response.data as PaystackInitialize;
  } catch (error: any) {
    console.log(error.response);
    return {
      status: false,
      message: "An error occurred while initializing payment",
      data: {
        authorization_url: "",
        access_code: "",
        reference: "",
      },
    };
  }
};

export const verifyPaystackPayment = async (reference: string) => {
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    console.log(response.data);
    return response.data as PaystackVerify;
  } catch (error: any) {
    console.log(error.response);
  }
};
