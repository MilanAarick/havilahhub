"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen, Lightbulb, Loader2, Rocket, Sparkles } from "lucide-react";
import { SIGN_IN_FORM, SIGN_UP_FORM } from "@/constants/forms";
import { FormGenerator } from "@/components/global/form-generator";
import { useAuthSignup } from "@/hooks/authentication";
import dynamic from "next/dynamic";
import SignUpForm from "./signup-form";

const OtpInput = dynamic(() => import("@/components/global/otp-input"), {
  ssr: false,
});

export default function SignupPage() {
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
            Join Havilah Learning Hub
          </h2>
          <SignUpForm />
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
              Start Your Learning Adventure
            </motion.h3>
            <motion.p
              className="mt-4 text-center text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Join Havilah Learning Hub and unlock a world of knowledge and
              growth!
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
