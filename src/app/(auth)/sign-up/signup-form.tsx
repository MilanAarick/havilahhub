"use client";

import { FormGenerator } from "@/components/global/form-generator";
import OTPInput from "@/components/global/otp-input";
import { Button } from "@/components/ui/button";
import { SIGN_UP_FORM } from "@/constants/forms";
import { useAuthSignup } from "@/hooks/authentication";
import { useUserStore } from "@/hooks/store/user";
import { Loader2, Sparkles } from "lucide-react";
import React from "react";

type Props = {};

const SignUpForm = (props: Props) => {
  const {
    register,
    errors,
    verifying,
    creating,
    onGenerateCode,
    onInitiateUserRegistration,
    code,
    setCode,
    getValues,
    sendingCode,
    params,
  } = useAuthSignup();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onInitiateUserRegistration();
  };

  return (
    <form className="flex flex-col gap-3 mt-10" onSubmit={handleSubmit}>
      {verifying ? (
        <div className="flex justify-center mb-5">
          <OTPInput otp={code} setOtp={setCode} />
        </div>
      ) : (
        SIGN_UP_FORM.map((field) => (
          <FormGenerator
            {...field}
            key={field.id}
            register={register}
            errors={errors}
          />
        ))
      )}

      {verifying ? (
        <Button type="submit" className="rounded-2xl" disabled={creating}>
          Sign Up with Email
          {creating && <Loader2 className="animate-spin" />}
        </Button>
      ) : (
        <Button
          disabled={sendingCode}
          type="button"
          className="rounded-2xl group gap-3"
          onClick={() => {
            onGenerateCode(getValues("email"), getValues("password"));
          }}
        >
          Generate Code
          <Sparkles
            size={20}
            className="group-hover:rotate-[360deg] duration-500"
          />
        </Button>
      )}
    </form>
  );
};

export default SignUpForm;
