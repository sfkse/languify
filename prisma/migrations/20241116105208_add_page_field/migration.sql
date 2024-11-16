/*
  Warnings:

  - Added the required column `page` to the `Glossary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Glossary" ADD COLUMN     "page" INTEGER NOT NULL;
