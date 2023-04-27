/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Genre` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Genre` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Genre` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Genre` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Genre" DROP COLUMN "createdAt",
DROP COLUMN "date",
DROP COLUMN "name",
DROP COLUMN "updatedAt";
