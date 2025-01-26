"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormHeader } from "./google-form-header";
import { ServiceSection } from "./service-section";
import { toast } from "sonner";
import { sendEmail } from "@/actions/send-email";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { payWithPaystack } from "@/actions/payment";
import { ServiceType } from "@prisma/client";
import { TutorFormData } from "@/constants/forms";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  parentName: z
    .string()
    .min(1, { message: "Parent/Guardian name is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  homeAddress: z.string().min(1, { message: "Home address is required" }),
  preferredContact: z.enum(["phone", "email"], {
    required_error: "Please select your preferred contact method",
  }),
  referralSource: z.enum(["social", "referral", "website"], {
    required_error: "Please select how you heard about us",
  }),
  services: z.object({
    physicalClasses: z.enum(["80000", "100000", "120000"]).optional(),
    onlineClasses: z.enum(["50000", "65000", "80000"]).optional(),
    artsMusic: z.enum(["100000", "130500", "165000"]).optional(),
    languages: z.enum(["95000", "125000", "155000"]).optional(),
  }),
});

export default function GoogleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: {},
    },
  });
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["initialize-paystack"],
    mutationFn: ({
      amount,
      type,
      email,
      phone,
      subjects,
    }: {
      amount: number;
      type: ServiceType;
      email: string | undefined;
      phone: string | undefined;
      subjects: string | undefined;
    }) => payWithPaystack(amount, type, email, phone, subjects),
  });

  const handleBuy = async (
    amount: number,
    email: string,
    type: ServiceType,
    phone: string,
    subjects: string
  ) => {
    await mutateAsync(
      {
        amount,
        type,
        email,
        phone,
        subjects,
      },
      {
        onSuccess(data, variables, context) {
          toast.success(data.message);
          window.location.href = data.data.authorization_url;
        },
        onError(error, variables, context) {
          toast.error(error.message);
        },
      }
    );
  };

  const calculateTotalAmount = (
    services: TutorFormData["services"]
  ): number => {
    return Object.values(services).reduce((total, service) => {
      return total + (service ? Number.parseInt(service) : 0);
    }, 0);
  };

  const getSelectedSubjects = (services: TutorFormData["services"]): string => {
    const subjects = [];
    if (services.physicalClasses) subjects.push("Physical Classes");
    if (services.onlineClasses) subjects.push("Online Classes");
    if (services.artsMusic) subjects.push("Arts & Music");
    if (services.languages) subjects.push("Languages");
    return subjects.join(", ");
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const totalAmount = calculateTotalAmount(values.services);
    const selectedSubjects = getSelectedSubjects(values.services);
    setIsSubmitting(true);
    try {
      handleBuy(
        totalAmount,
        values.email,
        ServiceType.PERSONALIZED_TUTORING,
        values.phoneNumber,
        selectedSubjects
      );
      //   const result = await sendEmail(values);
      //   if (result.success) {
      //     toast.success("Thank you for your submission. We'll be in touch soon!");
      //     form.reset();
      //   } else {
      //     throw new Error(result.message);
      //   }
    } catch (error) {
      //   toast.error("Failed to submit form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 bg-[#F0EBE9] p-4">
      <FormHeader
        title="Havilah's Educational Services"
        subtitle="Service Preference Form"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="rounded-lg border bg-white p-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="rounded-lg border bg-white p-6">
            <FormField
              control={form.control}
              name="parentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Parent/Guardian Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="rounded-lg border bg-white p-6">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Phone Number <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="rounded-lg border bg-white p-6">
            <FormField
              control={form.control}
              name="homeAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Home Address <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="rounded-lg border bg-white p-6">
            <FormField
              control={form.control}
              name="preferredContact"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base font-medium">
                    Preferred Means of Contact{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="phone" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Phone Number
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="email" />
                        </FormControl>
                        <FormLabel className="font-normal">Email</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="rounded-lg border bg-white p-6">
            <FormField
              control={form.control}
              name="referralSource"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base font-medium">
                    How did you hear about Havilah&apos;s educational services?{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="social" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Social Media
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="referral" />
                        </FormControl>
                        <FormLabel className="font-normal">Referral</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="website" />
                        </FormControl>
                        <FormLabel className="font-normal">Website</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormHeader title="Service Preference" />
          <div className="space-y-4">
            <p className="rounded-lg border bg-white p-4 text-sm">
              Select any that applies.
              <br />
              NOTE: The fee attached is the price per month!
            </p>

            <FormField
              control={form.control}
              name="services.physicalClasses"
              render={({ field }) => (
                <ServiceSection
                  title="General Subjects: Physical Classes"
                  options={[
                    { value: "80000", label: "₦80,000 (Two days weekly)" },
                    { value: "100000", label: "₦100,000 (Three days weekly)" },
                    { value: "120000", label: "₦120,000 (Five days weekly)" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <FormField
              control={form.control}
              name="services.onlineClasses"
              render={({ field }) => (
                <ServiceSection
                  title="General Subjects: Online Classes"
                  options={[
                    { value: "50000", label: "₦50,000 (Two days weekly)" },
                    { value: "65000", label: "₦65,000 (Three days weekly)" },
                    { value: "80000", label: "₦80,000 (Five days weekly)" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <FormField
              control={form.control}
              name="services.artsMusic"
              render={({ field }) => (
                <ServiceSection
                  title="Arts & Music"
                  options={[
                    { value: "100000", label: "₦100,000 (Two days weekly)" },
                    { value: "130500", label: "₦130,500 (Three days weekly)" },
                    { value: "165000", label: "₦165,000 (Five days weekly)" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <FormField
              control={form.control}
              name="services.languages"
              render={({ field }) => (
                <ServiceSection
                  title="Local & International Languages"
                  options={[
                    { value: "95000", label: "₦95,000 (Two days weekly)" },
                    { value: "125000", label: "₦125,000 (Three days weekly)" },
                    { value: "155000", label: "₦155,000 (Five days weekly)" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <Button
            type="submit"
            variant={"secondary"}
            className="w-full text-white hover:bg-secondary"
          >
            Submit {isSubmitting && <Loader2 className="animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
