import { onGetUser, onSignUpUser } from "@/actions/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { createId } from "@paralleldrive/cuid2";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async ({ searchParams }: Props) => {
  const user = await currentUser();
  const dbUser = await onGetUser(user?.id);

  if (dbUser.data?.id) {
    return redirect("/home");
  }

  const referredBy = searchParams.referredBy as string;
  const referralType = searchParams.referralType as string;

  if (!user) {
    redirect("/sign-up");
  }

  const data = await onSignUpUser(
    {
      firstname: user?.firstName ?? "",
      lastname: user?.lastName ?? "",
      clerkId: user?.id ?? "",
      image: user?.imageUrl ?? "",
      email: user?.emailAddresses[0]?.emailAddress ?? "",
      referralCode: `HA${createId()}`,
    },
    referredBy,
    referralType
  );

  if (data.status === 200) {
    redirect("/home"); // or wherever you want to redirect after successful signup
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Creating your account...</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <Loader2 size={48} className="animate-spin" />
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
