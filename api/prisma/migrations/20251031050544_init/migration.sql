/*
  Warnings:

  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `salary` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `taxCode` on the `Employee` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Payrun` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `periodEnd` on the `Payrun` table. All the data in the column will be lost.
  - You are about to drop the column `periodStart` on the `Payrun` table. All the data in the column will be lost.
  - You are about to drop the column `totalGross` on the `Payrun` table. All the data in the column will be lost.
  - You are about to drop the column `totalNet` on the `Payrun` table. All the data in the column will be lost.
  - You are about to drop the column `totalTax` on the `Payrun` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Payrun` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Timesheet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `allowances` on the `Timesheet` table. All the data in the column will be lost.
  - You are about to drop the column `entries` on the `Timesheet` table. All the data in the column will be lost.
  - You are about to drop the column `periodEnd` on the `Timesheet` table. All the data in the column will be lost.
  - You are about to drop the column `periodStart` on the `Timesheet` table. All the data in the column will be lost.
  - You are about to alter the column `employeeId` on the `Timesheet` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `id` on the `Timesheet` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `hourlyRate` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Payrun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Payrun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Timesheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoursWorked` to the `Timesheet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Payslip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employeeId" INTEGER NOT NULL,
    "payrunId" INTEGER NOT NULL,
    "grossPay" REAL NOT NULL,
    CONSTRAINT "Payslip_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Payslip_payrunId_fkey" FOREIGN KEY ("payrunId") REFERENCES "Payrun" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hourlyRate" REAL NOT NULL
);
INSERT INTO "new_Employee" ("email", "id", "name") SELECT "email", "id", "name" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");
CREATE TABLE "new_Payrun" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Payrun" ("createdAt", "id") SELECT "createdAt", "id" FROM "Payrun";
DROP TABLE "Payrun";
ALTER TABLE "new_Payrun" RENAME TO "Payrun";
CREATE TABLE "new_Timesheet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employeeId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "hoursWorked" REAL NOT NULL,
    CONSTRAINT "Timesheet_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Timesheet" ("employeeId", "id") SELECT "employeeId", "id" FROM "Timesheet";
DROP TABLE "Timesheet";
ALTER TABLE "new_Timesheet" RENAME TO "Timesheet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
