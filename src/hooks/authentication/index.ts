// import { onSignUpUser } from "@/actions/auth";
// import { SignUpSchema } from "@/components/forms/sign-up/schema";
import { onSignUpUser, registerDeviceOnSignup } from "@/actions/auth";
import { SignInSchema, SignUpSchema } from "@/constants/forms";
import { useClerk, useSignIn, useSignUp } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";
import { checkAndRegisterDevice } from "@/actions/auth";

export const useAuthSignIn = () => {
  const { isLoaded, setActive, signIn } = useSignIn();
  const searchParams = useSearchParams(); // Get search parameters
  const redirect_url = searchParams.get("redirect_url"); // Extract redirect_url
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
    setValue,
  } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    mode: "onBlur",
  });

  const router = useRouter();

  const generateDeviceFingerprint = async () => {
    const deviceData = [
      navigator.userAgent,
      navigator.hardwareConcurrency,
    ].join("|");

    // Create a hash of the device data
    const encoder = new TextEncoder();
    const data = encoder.encode(deviceData);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const onClerkAuth = async (email: string, password: string) => {
    if (!isLoaded)
      return toast.error("Something went wrong, please try again later");

    try {
      const authenticated = await signIn.create({
        identifier: email,
        password,
      });

      if (authenticated.status === "complete") {
        const deviceInfo = {
          browserName: navigator.userAgent,
          osName: navigator.platform ?? "",
          deviceId: await generateDeviceFingerprint(), // Use fingerprint instead of createId
          userId: authenticated.id!,
        };

        const { isNewDevice } = await checkAndRegisterDevice(deviceInfo);

        // if (isNewDevice) {
        //   toast.info("New device detected! We've sent you a verification email.");
        // }

        reset();
        await setActive({ session: authenticated.createdSessionId });
        toast.success("Welcome back!");
        router.push(redirect_url ? redirect_url : "/home");
      }
    } catch (error: any) {
      if (error.errors[0].code === "form_password_incorrect") {
        toast.error("Email or password is incorrect");
      } else if (error.errors[0].code === "Session already exists") {
        router.push(redirect_url ? redirect_url : "/home");
      } else if (error.errors[0].message === "Invalid verification strategy") {
        toast.error(
          "You created this account with a different method. Please sign In using it."
        );
      } else {
        toast.error(error.errors[0].message);
      }
    }
  };

  const { mutate: initiateLoginFlow, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      onClerkAuth(email, password),
  });

  const onAuthenticatedUser = handleSubmit(async (values) => {
    initiateLoginFlow({ email: values.email, password: values.password });
  });

  return {
    isPending,
    onAuthenticatedUser,
    register,
    errors,
    watch,
    setValue,
  };
};

export const useAuthSignup = () => {
  const params = new URLSearchParams(useSearchParams().toString());
  const referredBy = params.get("referredBy");
  const referralType = params.get("referralType");
  const referralUrl = referredBy ? `?referredBy=${referredBy}` : "";
  const referralTypeUrl = referralType ? `&referralType=${referralType}` : "";
  const { setActive, isLoaded, signUp } = useSignUp();
  const [creating, setCreating] = useState(false);

  const [sendingCode, setSendingCode] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const clerk = useClerk();

  const generateDeviceFingerprint = async () => {
    const deviceData = [
      navigator.userAgent,
      navigator.hardwareConcurrency,
    ].join("|");

    // Create a hash of the device data
    const encoder = new TextEncoder();
    const data = encoder.encode(deviceData);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    getValues,
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    mode: "onBlur",
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const redirectUrl: string[] = [];
  if (referredBy) redirectUrl.push(`referredBy=${referredBy}`);
  if (referralType) redirectUrl.push(`referralType=${referralType}`);
  const redirect = redirectUrl.length > 0 ? `?${redirectUrl.join("&")}` : "";
  const onGenerateCode = async (email: string, password: string) => {
    if (!isLoaded)
      return toast.error("Something went wrong, please try again later");

    try {
      setSendingCode(true);
      if (email && password) {
        await signUp.create({
          emailAddress: getValues("email"),
          password: getValues("password"),
          firstName: getValues("firstname"),
          lastName: getValues("lastname"),
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        setVerifying(true);
        toast.success("Code sent to your email");
      } else {
        return toast.warning("Please fill in the form");
      }
    } catch (error: any) {
      if (
        error?.errors[0]?.message ===
        "That email address is taken. Please try another."
      ) {
        toast.error("Email already in use, please try another");
      } else {
        toast.error(error?.errors[0]?.message ?? "An error occurred");
      }
      console.log(JSON.stringify(error, null, 2));
    } finally {
      setSendingCode(false);
    }
  };

  const onInitiateUserRegistration = handleSubmit(async (values) => {
    if (!isLoaded)
      return toast.error("Something went wrong, please try again later");

    try {
      setCreating(true);
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        return toast.error("Something went wrong with the code verification");
      }

      if (completeSignUp.status === "complete") {
        if (!signUp.createdUserId) return toast.error("User not found");

        reset();

        if (signUp.createdUserId) {
          const deviceInfo = {
            browserName: navigator.userAgent,
            osName: navigator.platform ?? "",
            deviceId: await generateDeviceFingerprint(), // Use fingerprint instead of createId
            userId: signUp.id!,
          };

          await registerDeviceOnSignup(deviceInfo);
          toast.success("Creating account");
          await setActive({
            session: completeSignUp.createdSessionId,
          });
          router.push(`/callback${redirect}`);
        }

        setCreating(false);
        setVerifying(false);
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }

      return;
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2));
      if (error.errors && error.errors[0] && error.errors[0].message) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("An error occurred during registration");
      }
    } finally {
      setCreating(false);
    }
  });

  return {
    onGenerateCode,
    onInitiateUserRegistration,
    register,
    errors,
    code,
    getValues,
    setCode,
    verifying,
    creating,
    sendingCode,
    params: params.get("referredBy"),
  };
};

export const useGoogleAuth = () => {
  const { signIn, isLoaded: LoadedSignIn } = useSignIn();
  const { signUp, isLoaded: LoadedSignUp } = useSignUp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const referredBy = searchParams.get("referredBy");
  const referralType = searchParams.get("referralType");
  const redirect_url = searchParams.get("redirect_url");

  const signInWith = async (strategy: OAuthStrategy, id?: string) => {
    if (!LoadedSignIn) return;

    try {
      // Construct redirect URL with referral parameters
      const redirectUrlComplete =
        "/home" +
        (referredBy ? `?referredBy=${referredBy}` : "") +
        (referralType
          ? `${referredBy ? "&" : "?"}referralType=${referralType}`
          : "");

      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: redirect_url ? redirect_url : "/home",
        redirectUrlComplete,
      });
    } catch (error: any) {
      console.log("errors", error.errors[0]);
      if (error.errors[0]?.code === "session_exists") {
        router.push(redirect_url ? redirect_url : "/home");
      }
      router.push(redirect_url ? redirect_url : "/home");
    }
  };

  const signUpWith = (strategy: OAuthStrategy) => {
    if (!LoadedSignUp) return;
    try {
      // Construct callback URL with referral parameters
      const redirectUrlComplete =
        "/callback" +
        (referredBy ? `?referredBy=${referredBy}` : "") +
        (referralType
          ? `${referredBy ? "&" : "?"}referralType=${referralType}`
          : "");

      return signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: redirectUrlComplete,
        redirectUrlComplete,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { signUpWith, signInWith };
};
