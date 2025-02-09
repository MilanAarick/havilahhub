import { banner_three } from "@/assets/images";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import AboutWriters from "./_components/about-writers";
import AboutServices from "./_components/about-services";
import Testimonials from "./_components/testimonials";
import CallToAction from "./_components/call-to-action";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <section className="relative bg-secondary text-white overflow-hidden ">
        <div className="absolute inset-0">
          <Image
            src={banner_three}
            alt="Students studying"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
          />
        </div>
        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <h1 className="text-5xl font-extrabold mb-6">
            Elevate Your Writing with Havilah Writers
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            From academic excellence to creative brilliance, we deliver
            high-quality, tailored writing services for students, businesses,
            and authors.
          </p>
          <Link href={"/services/writing/buy-writing-service"}>
            <Button
              size="lg"
              variant="secondary"
              className="bg-black text-white hover:bg-black hover:text-white"
            >
              Explore Our Services
            </Button>
          </Link>
        </div>
        <svg
          className="absolute bottom-0 w-full text-white"
          viewBox="0 0 1440 100"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C240,100 480,100 720,0 C960,100 1200,100 1440,0 L1440,100 L0,100 Z"></path>
        </svg>
      </section>
      <AboutWriters />
      <AboutServices />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Page;
