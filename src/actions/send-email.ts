"use server";

import { renderFormSubmissionEmail } from "@/app/(landingPage)/services/_components/form-submission";
import { TutorFormData } from "@/constants/forms";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Zoho",
  host: "smtp.zoho.eu",
  port: 587,
  secure: true,
  auth: {
    user: process.env.ZOHO_MAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
});

export async function sendEmail(formData: TutorFormData) {
  try {
    const emailHtml = await renderFormSubmissionEmail(formData);

    await transporter.sendMail({
      from: `"Havilah Educational Services" < ${process.env.ZOHO_MAIL}>`,
      to: process.env.ZOHO_MAIL,
      subject: "New Purchase",
      html: emailHtml,
    });

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
}
