DROP TABLE IF EXISTS "Industry_Volume";
CREATE TABLE "Industry_Volume"(
    id serial PRIMARY KEY,
	industry Varchar(255),
	sector Varchar(255),
    total_volume FLOAT
);
INSERT INTO "Industry_Volume" (industry,sector, total_volume)
SELECT "Industry","Sector", SUM("Volume") AS total_volume
FROM
    "Final_Data"
GROUP BY  "Sector","Industry"
ORDER BY total_volume desc;
SELECT * FROM "Industry_Volume"