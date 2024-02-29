CREATE TABLE "Summary" AS
SELECT
    subquery."Ticker",
    subquery."Start_Date",
    subquery."End_Date",
    MIN(CASE WHEN "Date" = subquery."Start_Date" THEN "Open" END) AS "Initial_Open",
    MAX(CASE WHEN "Date" = subquery."End_Date" THEN "Close" END) AS "Final_Close",
    MAX(CASE WHEN "Date" = subquery."End_Date" THEN "Close" END) - MIN(CASE WHEN "Date" = subquery."Start_Date" THEN "Open" END) AS "Total_Change",
    (MAX(CASE WHEN "Date" = subquery."End_Date" THEN "Close" END) - MIN(CASE WHEN "Date" = subquery."Start_Date" THEN "Open" END)) / NULLIF(MIN(CASE WHEN "Date" = subquery."Start_Date" THEN "Open" END), 0) * 100 AS "Percentage_Change",
    AVG("Volume") AS "Average_Volume"
FROM
    (
        SELECT
            "Ticker",
            MIN("Date") AS "Start_Date",
            MAX("Date") AS "End_Date"
        FROM
            "Final_Data"
        GROUP BY
            "Ticker"
    ) AS subquery
JOIN
    "Final_Data" ON "Final_Data"."Ticker" = subquery."Ticker"
GROUP BY
    subquery."Ticker", subquery."Start_Date", subquery."End_Date";

	
SELECT * FROM "Summary";
