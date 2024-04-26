-- DropForeignKey
ALTER TABLE `SaldoGasto` DROP FOREIGN KEY `SaldoGasto_idgasto_fkey`;

-- AlterTable
ALTER TABLE `SaldoGasto` MODIFY `idgasto` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `SaldoGasto` ADD CONSTRAINT `SaldoGasto_idgasto_fkey` FOREIGN KEY (`idgasto`) REFERENCES `Gasto`(`idgasto`) ON DELETE SET NULL ON UPDATE CASCADE;
