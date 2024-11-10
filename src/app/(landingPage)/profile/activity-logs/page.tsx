import { onGetUserLearnings } from "@/actions/user";
import { ActivityLogTable } from "@/components/global/activity-log";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const user = await currentUser();
  const data = await onGetUserLearnings(user?.id);
  const activityLogs = data.data?.activityLogs;

  return (
    <main className="px-5 max-w-screen-md mx-auto">
      <h1 className="py-5 border-b w-full text-2xl lg:text-4xl font-medium font-poppins ">
        Activity Logs
      </h1>

      {activityLogs ? (
        <ActivityLogTable data={activityLogs} />
      ) : (
        <div className="flex justify-center items-center h-96">
          <p className="text-lg text-gray-500">No activity logs found.</p>
        </div>
      )}
    </main>
  );
};

export default page;
