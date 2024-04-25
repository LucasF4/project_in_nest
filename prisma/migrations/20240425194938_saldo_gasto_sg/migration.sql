/*
  Warnings:

  - Added the required column `updatedAt` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Users` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Saldo` (
    `idsaldo` INTEGER NOT NULL AUTO_INCREMENT,
    `valorInit` INTEGER NOT NULL,
    `valorAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idsaldo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gasto` (
    `idgasto` INTEGER NOT NULL AUTO_INCREMENT,
    `valorGasto` INTEGER NOT NULL,
    `nameProd` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idgasto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SaldoGasto` (
    `idsaldogasto` INTEGER NOT NULL AUTO_INCREMENT,
    `idgasto` INTEGER NOT NULL,
    `idsaldo` INTEGER NOT NULL,
    `iduser` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idsaldogasto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SaldoGasto` ADD CONSTRAINT `SaldoGasto_idgasto_fkey` FOREIGN KEY (`idgasto`) REFERENCES `Gasto`(`idgasto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaldoGasto` ADD CONSTRAINT `SaldoGasto_idsaldo_fkey` FOREIGN KEY (`idsaldo`) REFERENCES `Saldo`(`idsaldo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaldoGasto` ADD CONSTRAINT `SaldoGasto_iduser_fkey` FOREIGN KEY (`iduser`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
