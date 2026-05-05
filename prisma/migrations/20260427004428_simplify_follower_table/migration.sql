/*
  Warnings:

  - The primary key for the `followers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `followers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "followers" DROP CONSTRAINT "followers_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "followers_pkey" PRIMARY KEY ("follower_id", "following_id");
