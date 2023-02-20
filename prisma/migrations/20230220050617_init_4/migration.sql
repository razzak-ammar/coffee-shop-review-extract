-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CoffeeHouse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "region" TEXT NOT NULL DEFAULT 'Unknown'
);
INSERT INTO "new_CoffeeHouse" ("id", "name", "url") SELECT "id", "name", "url" FROM "CoffeeHouse";
DROP TABLE "CoffeeHouse";
ALTER TABLE "new_CoffeeHouse" RENAME TO "CoffeeHouse";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
