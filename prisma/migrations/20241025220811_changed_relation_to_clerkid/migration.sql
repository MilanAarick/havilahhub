-- DropForeignKey
ALTER TABLE "TestAttempt" DROP CONSTRAINT "TestAttempt_userId_fkey";

-- AddForeignKey
ALTER TABLE "TestAttempt" ADD CONSTRAINT "TestAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
