import { onGetUser } from "@/actions/auth";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import Profile from "./_components/profile";

type Props = {};

const ProfilePage = async (props: Props) => {
  const user = await currentUser();
  const profileUser = await onGetUser(user?.id);
  return (
    <main className="pt-20">
      <h1 className="py-5 border-b w-full text-2xl lg:text-4xl font-medium font-poppins">
        Personal Information
      </h1>

      {profileUser?.data ? (
        <Profile user={profileUser?.data} />
      ) : (
        <div>
          <h1>No data found</h1>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;
