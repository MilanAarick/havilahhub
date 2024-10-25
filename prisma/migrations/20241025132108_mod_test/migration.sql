/*
  Warnings:

  - You are about to drop the column `contentLibraryId` on the `Test` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_contentLibraryId_fkey";

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "contentLibraryId";
