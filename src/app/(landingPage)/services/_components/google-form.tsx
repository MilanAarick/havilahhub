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
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { payWithPaystack } from "@/actions/payment";
import { ServiceType } from "@prisma/client";
import { TutorFormData } from "@/constants/forms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MultiSelect } from "@/components/ui/multi-select";
import { TimeDurationSelect } from "@/components/ui/time-select";

const schoolLevel = [
  { label: "Pre School", value: "Pre School" },
  { label: "Kindergarten", value: "Kindergarten" },
  { label: "Grade 1", value: "Grade 1" },
  { label: "Grade 2", value: "Grade 2" },
  { label: "Grade 3", value: "Grade 3" },
  { label: "Grade 4", value: "Grade 4" },
  { label: "Grade 5", value: "Grade 5" },
  { label: "Grade 6", value: "Grade 6" },
  { label: "Grade 7", value: "Grade 7" },
  { label: "Grade 8", value: "Grade 8" },
  { label: "Grade 9", value: "Grade 9" },
  { label: "Grade 10", value: "Grade 10" },
  { label: "Grade 11", value: "Grade 11" },
  { label: "Grade 12", value: "Grade 12" },
];

const subjects = [
  { label: "Mathematics and Numeracy", value: "Mathematics and Numeracy" },
  { label: "English and Literacy", value: "English and Literacy" },
  {
    label: "Computer Science and Coding",
    value: "Computer Science and Coding",
  },
  { label: "Basic Science", value: "Basic Science" },
  { label: "Basic Technology", value: "Basic Technology" },
  { label: "Further Mathematics", value: "Further Mathematics" },
  { label: "Physics", value: "Physics" },
  { label: "Chemistry", value: "Chemistry" },
  { label: "Biology", value: "Biology" },
  { label: "Geography", value: "Geography" },
  { label: "Arts and Music", value: "Arts and Music" },
  { label: "Government", value: "Government" },
  { label: "Economics", value: "Economics" },
  { label: "Commerce", value: "Commerce" },
  { label: "Literature", value: "Literature" },
  {
    label: "Local and International Languages",
    value: "Local and International Languages",
  },
];

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
    physicalClasses: z.enum(["56000", "80000", "110000"]).optional(),
    onlineClasses: z.enum(["32000", "48000", "80000"]).optional(),

    languages: z.enum(["100000", "125000", "160000"]).optional(),
  }),
  numberOfChildren: z.number().int().min(1, {
    message: "Number of children is required",
  }),
  namesOfChildren: z
    .string()
    .min(1, { message: "Names of children is required" }),
  agesOfChildren: z
    .string()
    .min(1, { message: "Ages of children is required" }),
  currentSchools: z.string().min(1, { message: "Current schools is required" }),
  grades: z.array(z.string()).min(1, { message: "Grades is required" }),
  subjects: z.array(z.string()).min(1, { message: "Subjects is required" }),
  additionalInformation: z.string().optional(),
  challenges: z.string().optional(),
  details: z.string().optional(),
  goals: z.string().optional(),
  beginDate: z.string(),
  hours: z.number(),
});

export default function GoogleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: {},
      grades: [],
      subjects: [],
      hours: 1,
      beginDate: new Date().toISOString().split("T")[0],
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
    if (services.languages) subjects.push("Languages");
    return subjects.join(", ");
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const calcAmount =
      calculateTotalAmount(values.services) * (values.numberOfChildren ?? 1);
    const extraAmount = values.hours > 2 ? (values.hours - 2) * 15000 : 0; // Extra hours cost N15,000
    const totalAmount = calcAmount + extraAmount;
    const selectedSubjects = getSelectedSubjects(values.services);

    setIsSubmitting(true);
    try {
      handleBuy(
        Number(totalAmount) * 100,
        values.email,
        ServiceType.PERSONALIZED_TUTORING,
        values.phoneNumber,
        selectedSubjects
      );
      const result = await sendEmail(values);
      if (result.success) {
        toast.success("Thank you for your submission. We'll be in touch soon!");
        form.reset();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error("Failed to submit form. Please try again later.");
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
            <p className="rounded-lg border bg-white p-4 text-sm font-semibold">
              Select any that apply.
              <br />
              NOTE: The fee attached is the hourly price per month!
              <br className="mt-2" />
              Extra hours cost N15,000 and Special needs children cost an
              additional N15,000 on all plans
            </p>

            <FormField
              control={form.control}
              name="services.physicalClasses"
              render={({ field }) => (
                <ServiceSection
                  title="General Subjects: Physical Classes"
                  options={[
                    { value: "56000", label: "₦56,000 (Two days weekly)" },
                    { value: "80000", label: "₦80,000 (Three days weekly)" },
                    { value: "110000", label: "₦110,000 (Five days weekly)" },
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
                    { value: "32000", label: "₦32,000 (Two days weekly)" },
                    { value: "48000", label: "₦48,000 (Three days weekly)" },
                    { value: "80000", label: "₦80,000 (Five days weekly)" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            {/* <FormField
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
            /> */}

            <FormField
              control={form.control}
              name="services.languages"
              render={({ field }) => (
                <ServiceSection
                  title="Computer & Coding and Local & International Languages"
                  options={[
                    { value: "100000", label: "₦100,000 (Two days weekly)" },
                    { value: "125000", label: "₦125,000 (Three days weekly)" },
                    { value: "160000", label: "₦160,000 (Five days weekly)" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <FormHeader title="Child Details" />
          <div className="space-y-4">
            <div className="rounded-lg border bg-white p-6">
              <FormField
                control={form.control}
                name="numberOfChildren"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Number of Children
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="rounded-lg border bg-white p-6">
              <FormField
                control={form.control}
                name="namesOfChildren"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Names of Children
                      <span className="text-red-500">*</span>
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
                name="agesOfChildren"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Age(s) of Child(ren)
                      <span className="text-red-500">*</span>
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
                name="currentSchools"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Current Schools
                      <span className="text-red-500">*</span>
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
                name="grades"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-base font-medium">
                      Grades
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={schoolLevel}
                        selected={field.value}
                        onChange={field.onChange}
                        placeholder="Select grades"
                        emptyMessage="No grades found."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="rounded-lg border bg-white p-6">
              <FormField
                control={form.control}
                name="subjects"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-base font-medium">
                      Subjects
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={subjects}
                        selected={field.value}
                        onChange={field.onChange}
                        placeholder="Select subject(s)"
                        emptyMessage="No subjects found."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="rounded-lg border bg-white p-6">
              <FormField
                control={form.control}
                name="additionalInformation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Details about your child&apos;s learning style, interests,
                      or preferences?
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
                name="challenges"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Details about your child&apos;s learning style, interests,
                      or preferences?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a response" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="rounded-lg border bg-white p-6">
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Kindly provide details
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
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Are there any particular academic goals you have for your
                      child?
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
                name="beginDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      When would you like to begin the tutoring sessions?
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="rounded-lg border bg-white p-6">
              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-base font-medium">
                      Duration
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <TimeDurationSelect
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            type="submit"
            variant={"secondary"}
            className="w-full text-white hover:bg-secondary"
          >
            Submit{" "}
            {form.formState.isLoading && <Loader2 className="animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
