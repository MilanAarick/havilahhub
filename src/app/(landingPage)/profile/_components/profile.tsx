import { User } from "@prisma/client";
import React from "react";

type Props = {
  user: Partial<User>;
};

const Profile = ({ user }: Props) => {
  return (
    <main>
      <div className="space-y-7">
        <div>
          <h1 className="text-2xl text-muted-foreground">Name</h1>
          <p>
            {user.firstname} {user.lastname}
          </p>
        </div>
        <div>
          <h1 className="text-2xl text-muted-foreground">Email</h1>
          <p>{user.email}</p>
        </div>
        <div>
          <h1 className="text-2xl text-muted-foreground">Points</h1>
          <p>{user.points}</p>
        </div>
        <div>
          <h1 className="text-2xl text-muted-foreground">Referral Code</h1>
          <p>{user.referralCode}</p>
        </div>
        <div>
          <h1 className="text-2xl text-muted-foreground">Referral Link</h1>
          <p>{`https://www.example.com/sign-up?referredBy=${user.referralCode}&referralType=writing`}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
