/*
  Warnings:

  - You are about to drop the column `filter` on the `Review` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "coffeeHouseId" INTEGER NOT NULL,
    "filtered" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Review_coffeeHouseId_fkey" FOREIGN KEY ("coffeeHouseId") REFERENCES "CoffeeHouse" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("coffeeHouseId", "id", "text", "title") SELECT "coffeeHouseId", "id", "text", "title" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
