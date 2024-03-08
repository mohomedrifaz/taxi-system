-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Driver" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "currentLocationLat" REAL NOT NULL,
    "currentLocationLong" REAL NOT NULL,
    "rating" REAL DEFAULT 0,
    "lastLogin" DATETIME NOT NULL,
    "registeredOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehicleType" TEXT NOT NULL DEFAULT 'unknown',
    "vehiclePlateNumber" TEXT DEFAULT 'unknown'
);
INSERT INTO "new_Driver" ("currentLocationLat", "currentLocationLong", "email", "firstName", "id", "lastLogin", "lastName", "licenseNumber", "passwordHash", "phoneNumber", "rating", "registeredOn", "status") SELECT "currentLocationLat", "currentLocationLong", "email", "firstName", "id", "lastLogin", "lastName", "licenseNumber", "passwordHash", "phoneNumber", "rating", "registeredOn", "status" FROM "Driver";
DROP TABLE "Driver";
ALTER TABLE "new_Driver" RENAME TO "Driver";
CREATE UNIQUE INDEX "Driver_email_key" ON "Driver"("email");
CREATE UNIQUE INDEX "Driver_phoneNumber_key" ON "Driver"("phoneNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
