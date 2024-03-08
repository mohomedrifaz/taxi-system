/*
  Warnings:

  - You are about to drop the column `price` on the `Trip` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "passengerName" TEXT,
    "passengerPhone" TEXT,
    "pickupLocation" TEXT NOT NULL,
    "dropoffLocation" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "bookedOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "driverId" INTEGER NOT NULL,
    "vehicleType" TEXT,
    "vehicleNo" TEXT,
    "totalFare" TEXT,
    CONSTRAINT "Trip_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Trip" ("bookedOn", "driverId", "dropoffLocation", "id", "passengerName", "passengerPhone", "paymentStatus", "pickupLocation") SELECT "bookedOn", "driverId", "dropoffLocation", "id", "passengerName", "passengerPhone", "paymentStatus", "pickupLocation" FROM "Trip";
DROP TABLE "Trip";
ALTER TABLE "new_Trip" RENAME TO "Trip";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
