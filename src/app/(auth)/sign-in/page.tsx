import React from "react";
import LoginScreen from "./signIn-component";
import { currentUser } from "@clerk/nextjs/server";

type Props = {};

const page = async (props: Props) => {
  const user = await currentUser();
  return (
    <main>
      <LoginScreen id={user?.id} />
    </main>
  );
};

export default page;
