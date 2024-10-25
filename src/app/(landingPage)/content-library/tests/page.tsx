import React from "react";
import TestNav from "../_components/test-nav";
import { onGetTests } from "@/actions/learnings";
import TestCatalogPage from "../_components/test-card";

type Props = {};

const page = async (props: Props) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 py-10 container">
        Available Tests
      </h1>
      <div className="container">
        <TestNav />
      </div>

      <div>
        <TestCatalogPage />
      </div>
    </div>
  );
};

export default page;
