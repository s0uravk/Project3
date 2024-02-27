














<<<<<<< HEAD

















CREATE TABLE "Automotive" (
    "date" Date   NOT NULL,
    "1. open" FLOAT   NOT NULL,
    "2. high" FLOAT   NOT NULL,
    "3. low" FLOAT   NOT NULL,
    "4. close" FLOAT   NOT NULL,
    "5. volume" FLOAT   NOT NULL,
    "Ticker" VARCHAR(10)   NOT NULL
);

SELECT * FROM "Automotive"

ALTER TABLE "Automotive"
RENAME COLUMN "date" TO "Date";

ALTER TABLE "Automotive"
RENAME COLUMN "1. open" TO "Open";

ALTER TABLE "Automotive"
RENAME COLUMN "2. high" TO "High";

ALTER TABLE "Automotive"
RENAME COLUMN "3. low" TO "Low";

ALTER TABLE "Automotive"
RENAME COLUMN "4. close" TO "Close";

ALTER TABLE "Automotive"
RENAME COLUMN "5. volume" TO "Volume";
=======
-- Schema for Finance Table
CREATE TABLE "Finance" (
    "id" SERIAL, 
    "Date" Date   NOT NULL,
    "Open" FLOAT   NOT NULL,
    "High" FLOAT   NOT NULL,
    "Low" FLOAT   NOT NULL,
    "Close" FLOAT   NOT NULL,
    "Adj Close" FLOAT   NOT NULL,
    "Volume" FLOAT NOT NULL,
    "Ticker" VARCHAR(10)   NOT NULL,
    CONSTRAINT "pk_Finance" PRIMARY KEY (
        "id"
     )
);
ALTER TABLE "Finance" DROP COLUMN "Adj Close";
>>>>>>> finance_sourav
