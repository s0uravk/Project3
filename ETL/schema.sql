















CREATE TABLE "Healthcare" (
    "date" Date   NOT NULL,
    "1. open" FLOAT   NOT NULL,
    "2. high" FLOAT   NOT NULL,
    "3. low" FLOAT   NOT NULL,
    "4. close" FLOAT   NOT NULL,
    "5. volume" FLOAT   NOT NULL,
    "Ticker" VARCHAR(10)   NOT NULL
);


ALTER TABLE "Healthcare"
RENAME COLUMN "date" TO "Date";

ALTER TABLE "Healthcare"
RENAME COLUMN "1. open" TO "Open";

ALTER TABLE "Healthcare"
RENAME COLUMN "2. high" TO "High";

ALTER TABLE "Healthcare"
RENAME COLUMN "3. low" TO "Low";

ALTER TABLE "Healthcare"
RENAME COLUMN "4. close" TO "Close";

ALTER TABLE "Healthcare"













































































-- Schema for Finance Table
CREATE TABLE "Finance" (
    "Date" Date   NOT NULL,
    "Open" FLOAT   NOT NULL,
    "High" FLOAT   NOT NULL,
    "Low" FLOAT   NOT NULL,
    "Close" FLOAT   NOT NULL,
    "Adj Close" FLOAT   NOT NULL,
    "Volume" FLOAT NOT NULL,
    "Ticker" VARCHAR(10)   NOT NULL
);
ALTER TABLE "Finance" DROP COLUMN "Adj Close";

