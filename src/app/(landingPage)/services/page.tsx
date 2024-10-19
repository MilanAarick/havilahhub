import React from "react";

import TabsComponent from "./_components/tab";
import SearchBar from "./_components/search-bar";

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-svh">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Havilah Learning Hub</h1>
        <SearchBar />
      </div>
      <TabsComponent />
      {/* Add your content here */}
    </div>
  );
};

export default Page;
