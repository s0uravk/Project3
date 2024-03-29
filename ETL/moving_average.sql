-- SELECT * FROM "Final_Data";

SELECT "Date",
	CASE 
		WHEN ROW_NUMBER() OVER (ORDER BY "Date") <= 29 THEN NULL
		ELSE AVG ("Close") OVER(ORDER BY "Date" ROWS BETWEEN 29 PRECEDING AND CURRENT ROW)
	END AS moving_average
FROM "Final_Data"
LIMIT 1000;