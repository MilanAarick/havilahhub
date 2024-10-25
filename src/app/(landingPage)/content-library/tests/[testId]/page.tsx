import { onGetSingleTest } from "@/actions/learnings";
import React from "react";
import TestPage from "./_components/testPage";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
  testId: string;
};

const page = async ({ params }: { params: { testId: string } }) => {
  const test = await onGetSingleTest(params.testId);

  return (
    <div>
      <article className="container pt-16">
        <h1 className="text-2xl font-semibold text-primary font-poppins lg:text-4xl py-4">
          Test
        </h1>
        {test?.data && (
          <p className="text-muted-foreground text-sm lg:text-base">
            Please read the question carefully
          </p>
        )}
      </article>

      <div>
        <TestPage test={test.data} />
      </div>
    </div>
  );
};

export default page;
