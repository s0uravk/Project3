DROP TABLE IF EXISTS "Technology";

CREATE TABLE "Technology" (
--     "id" SERIAL,
    "Date" Date   NOT NULL,
    "Open" FLOAT   NOT NULL,
    "High" FLOAT   NOT NULL,
    "Low" FLOAT   NOT NULL,
    "Close" FLOAT   NOT NULL,
    "Volume" FLOAT   NOT NULL,
    "Ticker" VARCHAR(10)   NOT NULL
--     CONSTRAINT "pk_Stocks" PRIMARY KEY (
--         "id"
--      )
);