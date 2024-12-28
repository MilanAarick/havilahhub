import React from "react";

import { currentUser } from "@clerk/nextjs/server";
import SearchBar from "../content-library/_components/search-bar";
import TabsComponent from "../content-library/_components/tab";
import VerifyPayment from "../content-library/_components/verify-payment-modal";

const Page = async () => {
  const user = await currentUser();
  return (
    <div className="container mx-auto px-4 py-8 min-h-svh">
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Havilah Learning Hub</h1>
        <SearchBar />
      </div>
      <TabsComponent />
      <VerifyPayment userId={user?.id} />
      {/* Add your content here */}
    </div>
  );
};

export default Page;
