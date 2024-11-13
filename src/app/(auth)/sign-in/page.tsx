"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen, Lightbulb, Rocket, Sparkles } from "lucide-react";
import { SIGN_IN_FORM } from "@/constants/forms";
import { FormGenerator } from "@/components/global/form-generator";
import { useAuthSignIn } from "@/hooks/authentication";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function LoginScreen() {
  const { isPending, onAuthenticatedUser, register, errors, watch, setValue } =
    useAuthSignIn();
  const email = watch("email");
  const password = watch("password");
  const [isHovering, setIsHovering] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const localData = localStorage.getItem("rememberMeData");
    if (localData) {
      const parsedData = JSON.parse(localData);
      setRememberMe(true);
      setValue("email", parsedData.email);
      setValue("password", parsedData.password);
    }
  }, [rememberMe]);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
    if (!email || !password)
      return toast.warning("Please enter your email and password");

    if (rememberMe) {
      localStorage.setItem(
        "rememberMeData",
        JSON.stringify({ email, password })
      );
    } else {
      localStorage.removeItem("rememberMeData");
    }
  };

  return (
    <div className=" flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-lg shadow-xl overflow-hidden flex max-w-4xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-heading font-bold text-primary mb-6">
            Welcome Back!
          </h2>
          <form
            className="flex flex-col gap-3 mt-10"
            onSubmit={onAuthenticatedUser}
          >
            {SIGN_IN_FORM.map((field) => (
              <FormGenerator
                {...field}
                key={field.id}
                register={register}
                errors={errors}
              />
            ))}

            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={handleRememberMe}
              />
              <Label htmlFor="remember">Remember me</Label>
            </div>

            <Button
              type="submit"
              className="w-full mt-6 group gap-4"
              disabled={isPending}
            >
              Sign In With Email
              <Sparkles
                size={20}
                className={cn(
                  " group-hover:rotate-[360deg] duration-500",
                  isPending ? "animate-spin" : ""
                )}
              />
            </Button>
          </form>
          <p className="mt-4 text-sm text-center">
            Don&apos;t have an account?{" "}
            <a href="/sign-up" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
          <Link href="/forgot-password">
            <p className="mt-4 text-sm text-secondary text-center">
              Forgot Password?
            </p>
          </Link>
        </div>

        {/* Right side - Illustration */}
        <div className="hidden md:block w-1/2 bg-primary/5 p-8">
          <div className="h-full flex flex-col items-center justify-center">
            <motion.div
              className="relative w-64 h-64"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <BookOpen size={64} className="text-primary" />
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Lightbulb
                  size={48}
                  className=" text-delft_blue-600 ml-16 mt-16"
                />
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Rocket size={40} className=" text-dark_cyan-500 mr-20 mb-20" />
              </motion.div>
            </motion.div>
            <motion.h3
              className="mt-8 text-2xl font-heading font-bold text-primary text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Unlock Your Learning Potential
            </motion.h3>
            <motion.p
              className="mt-4 text-center text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Join Havilah Learning Hub and embark on an exciting educational
              journey!
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
