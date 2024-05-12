-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Saldo` (
    `idsaldo` INTEGER NOT NULL AUTO_INCREMENT,
    `valorInit` INTEGER NOT NULL,
    `valorAt` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idsaldo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gasto` (
    `idgasto` INTEGER NOT NULL AUTO_INCREMENT,
    `valorGasto` INTEGER NOT NULL,
    `nameProd` VARCHAR(191) NOT NULL,
    `iduser` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idgasto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SaldoGasto` (
    `idsaldogasto` INTEGER NOT NULL AUTO_INCREMENT,
    `idgasto` INTEGER NULL,
    `idsaldo` INTEGER NOT NULL,
    `iduser` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idsaldogasto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ganhos` (
    `idganho` INTEGER NOT NULL AUTO_INCREMENT,
    `valorGanho` INTEGER NOT NULL,
    `nomeProd` INTEGER NOT NULL,
    `iduser` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idganho`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SaldoGasto` ADD CONSTRAINT `SaldoGasto_idgasto_fkey` FOREIGN KEY (`idgasto`) REFERENCES `Gasto`(`idgasto`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaldoGasto` ADD CONSTRAINT `SaldoGasto_idsaldo_fkey` FOREIGN KEY (`idsaldo`) REFERENCES `Saldo`(`idsaldo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaldoGasto` ADD CONSTRAINT `SaldoGasto_iduser_fkey` FOREIGN KEY (`iduser`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
