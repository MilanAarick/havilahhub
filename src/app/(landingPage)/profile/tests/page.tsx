import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { TestTable } from "../_components/test-table";
import { onGetTestAttempts } from "@/actions/learnings";

type Props = {};

const page = async (props: Props) => {
  const user = await currentUser();
  const tests = await onGetTestAttempts(user?.id);
  return (
    <main className="">
      <div className="container py-6">
        <h1 className="font-poppins text-xl lg:text-3xl pt-6 font-semibold">
          Test Scores
        </h1>

        <div className="mt-8">
          <TestTable data={tests?.data} />
        </div>
      </div>
    </main>
  );
};

export default page;
