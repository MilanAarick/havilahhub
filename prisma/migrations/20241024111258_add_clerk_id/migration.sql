-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'TUTOR', 'WRITER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('PERSONALIZED_TUTORING', 'EXAM_PREPARATION', 'RESEARCH_WRITING', 'BOOK_WRITING', 'BUSINESS_PLAN', 'SOP_WRITING');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('CURRICULUM', 'ASSESSMENT', 'LEARNING_STYLE_TEST');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "image" TEXT,
    "points" INTEGER NOT NULL DEFAULT 0,
    "referralCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "referredById" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "type" "ServiceType" NOT NULL,
    "subject" TEXT,
    "level" TEXT,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceDetail" TEXT NOT NULL,
    "serviceType" "ServiceType" NOT NULL,
    "referenceId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentLibrary" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "ContentType" NOT NULL,
    "subject" TEXT,
    "level" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentLibrary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Newsletter" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_referralCode_key" ON "User"("referralCode");

-- CreateIndex
CREATE UNIQUE INDEX "Newsletter_email_key" ON "Newsletter"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
