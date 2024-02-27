CREATE TABLE "Stocks" (
    "id" SERIAL,
    "Date" Date   NOT NULL,
    "Open" FLOAT   NOT NULL,
    "High" FLOAT   NOT NULL,
    "Low" FLOAT   NOT NULL,
    "Close" FLOAT   NOT NULL,
    "Adj Close" FLOAT   NOT NULL,
    "Volume" VARCHAR(255)   NOT NULL,
    "Ticker" VARCHAR(10)   NOT NULL,
    CONSTRAINT "pk_Stocks" PRIMARY KEY (
        "id"
     )
);