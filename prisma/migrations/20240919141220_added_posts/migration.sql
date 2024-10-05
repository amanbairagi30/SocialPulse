/*
  Warnings:

  - Added the required column `posts` to the `Social` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Social" ADD COLUMN     "posts" INTEGER NOT NULL;
