DROP TABLE IF EXISTS "Total_Volume";

CREATE TABLE "Total_Volume"(
    year INT,
    ticker VARCHAR(6),
    total_volume FLOAT
);

INSERT INTO "Total_Volume" (year, ticker, total_volume)
SELECT DATE_PART('year', "Date") as Year, "Ticker", SUM("Volume") AS total_volume
FROM 
	"Final_Data"
GROUP BY DATE_PART('year', "Date"), "Ticker"
ORDER BY total_volume desc;

-- SELECT * FROM "Total_Volume"