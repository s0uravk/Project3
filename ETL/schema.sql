DROP TABLE IF EXISTS "Technology";

CREATE TABLE "Technology" (
    "Date" Date   NOT NULL,
    "Open" FLOAT   NOT NULL,
    "High" FLOAT   NOT NULL,
    "Low" FLOAT   NOT NULL,
    "Close" FLOAT   NOT NULL,
    "Volume" FLOAT   NOT NULL,
    "Ticker" VARCHAR(10)   NOT NULL
);

-- This table stores healthcare data
CREATE TABLE "Healthcare" (
    "date" Date   NOT NULL,
    "1. open" FLOAT   NOT NULL,
    "2. high" FLOAT   NOT NULL,
    "3. low" FLOAT   NOT NULL,
    "4. close" FLOAT   NOT NULL,
    "5. volume" FLOAT   NOT NULL,
    "Ticker" VARCHAR(10)   NOT NULL
);  

-- Create Automotive Table
CREATE TABLE "Automotive" (
    "date" Date   NOT NULL,
    "1. open" FLOAT   NOT NULL,
    "2. high" FLOAT   NOT NULL,
    "3. low" FLOAT   NOT NULL,
    "4. close" FLOAT   NOT NULL,
    "5. volume" FLOAT   NOT NULL,
    "Ticker" VARCHAR(10)   NOT NULL
);  

-- Schema for Finance Data Table
CREATE TABLE "Finance" (
    "Date" Date   NOT NULL,
    "Open" FLOAT   NOT NULL,
    "High" FLOAT   NOT NULL,
    "Low" FLOAT   NOT NULL,
    "Close" FLOAT   NOT NULL,
    "Volume" FLOAT   NOT NULL,
    "Ticker" VARCHAR(10)   NOT NULL
);