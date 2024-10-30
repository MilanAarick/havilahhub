import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  User,
  Instagram,
  Facebook,
  Linkedin,
  ArrowRight,
  ArrowRightIcon,
  ArrowRightCircle,
} from "lucide-react";
import { banner_image, header_image } from "@/assets/images";

export default function Homepage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow ">
        <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground relative">
          <div className="container mx-auto px-4 py-16 flex items-center justify-between relative z-20">
            <div className="max-w-3xl h-[230px] lg:h-[380px]">
              <h1 className="text-4xl font-bold mb-4 font-poppins">
                Havilah Learning Hub: Giving you an Edge
              </h1>
              <p className="text-base lg:text-lg mb-8">
                Havilah Learning Hub provides personalized tutoring and research
                support from kindergarten to postgraduate levels, offering
                tailored tutoring, assignment help, and project assistance to
                help students excel academically.
              </p>
            </div>
          </div>
          <div className="absolute h-full w-full top-0 left-0 z-0">
            <Image
              src={banner_image}
              alt="Students learning"
              width={0}
              height={0}
              sizes="100vw"
              className="rounded-lg shadow-lg h-full w-full object-cover"
            />
            <div className="w-full h-full bg-black/40 z-10 absolute top-0 left-0"></div>
          </div>
        </section>

        <section className="bg-background text-foreground">
          <div className="container mx-auto px-4 py-16">
            <div className="flex items-center gap-8 flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 ">
                <Image
                  src={header_image}
                  alt="Students learning"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="lg:w-1/2 ">
                <h2 className="text-3xl font-bold mb-4 text-primary font-poppins">
                  Latest from Our Newsletter
                </h2>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <Link
                  href={"#"}
                  className="text-primary flex items-center gap-3"
                >
                  Sign up for our newsletter
                  <ArrowRightCircle />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
