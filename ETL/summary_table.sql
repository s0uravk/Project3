-- Create Summary table
DROP TABLE IF EXISTS "Summary";
CREATE TABLE "Summary" AS
SELECT subquery."Ticker",
	   MAX(CASE WHEN "Date" = subquery."Start_Date" THEN "Open" END) AS "Initial_Open",
	   MAX(CASE WHEN "Date" = subquery."End_Date" THEN "Close" END) AS "Final_Close",
	   (MAX(CASE WHEN "Date" = subquery."End_Date" THEN "Close" END) - MAX(CASE WHEN "Date" = subquery."Start_Date" THEN "Open" END)) AS "Total_Change",
	   (MAX(CASE WHEN "Date" = subquery."End_Date" THEN "Close" END) - MAX(CASE WHEN "Date" = subquery."Start_Date" THEN "Open" END))/ NULLIF(MAX(CASE WHEN "Date" = subquery."Start_Date" THEN "Open" END), 0) * 100 AS "Percentage_Change",
	   AVG("Volume") AS "Average_Volume",
	   "Final_Data"."Sector",
	   "Final_Data"."Industry"
FROM
	(SELECT "Ticker", 
			MIN("Date") AS "Start_Date", 
			MAX("Date") AS "End_Date" 
	 FROM "Final_Data" 
	 GROUP BY "Ticker") AS subquery
	JOIN "Final_Data" ON "Final_Data"."Ticker" = subquery."Ticker"
GROUP BY subquery."Ticker","Final_Data"."Sector", "Final_Data"."Industry"
ORDER BY subquery."Ticker";
	
-- Add the id column as SERIAL
ALTER TABLE "Summary"
ADD COLUMN id SERIAL;

-- Set id column as the primary key
ALTER TABLE "Summary"
ADD CONSTRAINT pk_Summary PRIMARY KEY (id);

SELECT * FROM "Summary";


