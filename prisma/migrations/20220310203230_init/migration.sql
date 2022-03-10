/*
  Warnings:

  - Changed the type of `event_group` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "event_group",
ADD COLUMN     "event_group" INTEGER NOT NULL;
