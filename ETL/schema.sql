











































































-- Schema for Finance Data Table
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
