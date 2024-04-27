/*
  Warnings:

  - Added the required column `iduser` to the `Gasto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `gasto` ADD COLUMN `iduser` VARCHAR(191) NOT NULL;
