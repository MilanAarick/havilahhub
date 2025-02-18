import { onGetUserLearnings } from "@/actions/user";
import { banner_image } from "@/assets/images";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";
import EmptyLearnings from "./_components/empty-learnings";
import { Button } from "@/components/ui/button";
import { ActivityLogTable } from "@/components/global/activity-log";
import Link from "next/link";
import VerifyPayment from "../content-library/_components/verify-payment-modal";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = async (props: Props) => {
  const reference = props.searchParams.reference as string;
  const clerk = await currentUser();
  const learnings = await onGetUserLearnings(clerk?.id);
  return (
    <main>
      <div>
        <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground relative">
          <div className="container mx-auto px-4 py-16 flex items-center justify-between relative z-20">
            <div className=" h-[calc(50svh-200px)] w-full max-w-2xl">
              <h1 className="text-2xl lg:text-3xl 2xl:text-5xl font-bold mb-4 font-poppins">
                Welcome to Havilah Learning Hub
              </h1>
              <p className="text-lg mb-8">
                Unlock your true potential with personalized tutoring and
                research support, guiding you through every step of your
                learning journey!
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
      </div>
      <aside className="bg-secondary text-white h-[120px] flex items-center justify-center">
        <div className="container flex items-center justify-between gap-5 py-5 md:py-10 lg:py-16 ">
          <h1 className="text-lg lg:text-2xl font-poppins font-semibold">
            Welcome, {clerk?.firstName}!
          </h1>
          <Link href="/services">
            <Button className="bg-white text-black hover:bg-white/90 hover:text-black">
              Go to Services
            </Button>
          </Link>
        </div>
      </aside>
      <aside className="container mx-auto my-16">
        {/* services user bought */}

        {/* <div>
          {learnings.data?.services?.length === 0 ? <EmptyLearnings /> : null}
        </div> */}
        <div className="text-center mt-20">
          <h1 className="text-xl font-poppins lg:text-2xl font-semibold py-8">
            Activity Log
          </h1>
          {learnings.data?.activityLogs?.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Your activity logs will appear here as you buy services
            </p>
          ) : (
            <ActivityLogTable
              data={learnings.data?.activityLogs.slice(0, 10)}
            />
          )}
        </div>
      </aside>
      {reference ? <VerifyPayment userId={clerk?.id} /> : null}
    </main>
  );
};

export default page;
