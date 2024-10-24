import { User } from "@prisma/client";
import React from "react";

type Props = {
  user: Partial<User>;
};

const Profile = ({ user }: Props) => {
  return (
    <main className="pt-7">
      <div className="space-y-7">
        <div>
          <h1 className="text-2xl text-muted-foreground font-poppins">Name</h1>
          <p>
            {user.firstname} {user.lastname}
          </p>
        </div>
        <div>
          <h1 className="text-2xl text-muted-foreground font-poppins">Email</h1>
          <p>{user.email}</p>
        </div>
        <div>
          <h1 className="text-2xl text-muted-foreground font-poppins">
            Points
          </h1>
          <p>{user.points}</p>
        </div>
        <div>
          <h1 className="text-2xl text-muted-foreground font-poppins">
            Referral Code
          </h1>
          <p className="font-medium">{user.referralCode}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
