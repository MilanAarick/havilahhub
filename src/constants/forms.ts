import z from "zod";

export type AuthFormProps = {
  id: string;
  type: "email" | "text" | "password";
  inputType: "select" | "input";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  name: string;
};

export const SignInSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }),
  password: z
    .string()
    .min(8, { message: "Password should contain at least 4 characters." }),
});

export const SignUpSchema = z.object({
  firstname: z.string().min(2, { message: "First name is required." }),
  lastname: z.string().min(2, { message: "Last name is required." }),
  email: z.string().email({ message: "Enter a valid email." }),
  password: z
    .string()
    .min(8, { message: "Password should contain at least 8 characters." }),
});

export const SIGN_UP_FORM: AuthFormProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "First name",
    name: "firstname",
    type: "text",
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "Last name",
    name: "lastname",
    type: "text",
  },
  {
    id: "3",
    inputType: "input",
    placeholder: "Email",
    name: "email",
    type: "email",
  },
  {
    id: "4",
    inputType: "input",
    placeholder: "Password",
    name: "password",
    type: "password",
  },
];

export const SIGN_IN_FORM: AuthFormProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Email",
    name: "email",
    type: "email",
  },
  {
    id: "4",
    inputType: "input",
    placeholder: "Password",
    name: "password",
    type: "password",
  },
];

export type TutorFormData = {
  email: string;

  parentName: string;

  phoneNumber: string;

  homeAddress: string;

  preferredContact: "email" | "phone";

  referralSource: "social" | "referral" | "website";

  services: {
    physicalClasses?: "80000" | "100000" | "120000";

    onlineClasses?: "50000" | "65000" | "80000";

    artsMusic?: "100000" | "130500" | "165000";

    languages?: "95000" | "125000" | "155000";
  };
};
