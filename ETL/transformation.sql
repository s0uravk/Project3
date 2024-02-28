SELECT * FROM "Automotive";
SELECT * FROM "Finance";
SELECT * FROM "Technology";

CREATE TABLE "Combined_data" (
    "Date" Date   NOT NULL,
    "Open" FLOAT   NOT NULL,
    "High" FLOAT   NOT NULL,
    "Low" FLOAT   NOT NULL,
    "Close" FLOAT   NOT NULL,
    "Volume" FLOAT   NOT NULL,
    "Ticker" VARCHAR(10)   NOT NULL
);

INSERT INTO "Combined_data"
	SELECT * FROM "Automotive"
    UNION ALL
    SELECT * FROM "Technology"
    UNION ALL
    SELECT Date, Open, High, Low, Close, Volume, Ticker FROM "Finance";
	
SELECT * FROM "Combined_data";

CREATE TABLE "Final_Data" (
	"id" SERIAL PRIMARY KEY,
    "Date" Date   NOT NULL,
    "Open" FLOAT   NOT NULL,
    "High" FLOAT   NOT NULL,
    "Low" FLOAT   NOT NULL,
    "Close" FLOAT   NOT NULL,
    "Volume" FLOAT   NOT NULL,
    "Ticker" VARCHAR(10)   NOT NULL,
	"Industry" VARCHAR(255)   NOT NULL,
	"Sector" VARCHAR(255)   NOT NULL
);

INSERT INTO "Final_Data"("Date", "Open", "High", "Low", "Close", "Volume", "Ticker", "Industry", "Sector")
SELECT "Date", "Open", "High", "Low", "Close", "Volume", "Ticker",
	CASE
		WHEN "Ticker" IN ('NVO','VRTX','REGN','SGEN','MRNA') THEN 'Biotech'
		WHEN "Ticker" IN ('ISRG','BDX','ALC','WST','RMD') THEN 'Medical Instruments & Supplies'
		WHEN "Ticker" IN ('UNH','ELV','CVS','CI','HUM') THEN 'Healthcare Plans'
		WHEN "Ticker" IN ('LLY','JNJ','MRK','AZN','PFE') THEN 'Drug Manufacturers'
		WHEN "Ticker" IN ('QCOM','TXN','ADI','MU','ARM') THEN 'Semiconductors'
		WHEN "Ticker" IN ('CRM','SAP','INTU','NOW','ZI') THEN 'Software'
		WHEN "Ticker" IN ('AAPL','MSFT','SONY','LPL','SONO') THEN 'Consumer'
		WHEN "Ticker" IN ('ACN','IBM','FI','INFY','CTSH') THEN 'Infotech'
		WHEN "Ticker" IN ('CPRT','KMX','PAG','LAD','AN') THEN 'Auto & Truck Dealerships'
		WHEN "Ticker" IN ('MBLY','APTV','MGA','LKQ','ALV') THEN 'Auto Parts'
		WHEN "Ticker" IN ('TSLA','TM','HMC','GM','F') THEN 'Auto Manufacturers'
		WHEN "Ticker" IN ('NVDA','TSM','AVGO','AMD','INTC') THEN 'Semiconductors'
		WHEN "Ticker" IN ('WD','PFSI','LDI','GHI','COOP') THEN 'Mortgage'
		WHEN "Ticker" IN ('AFL','HIG','PRU','ALL','PGR') THEN 'Insurance'
		WHEN "Ticker" IN ('MS','BLK','GS','TROW','BEN') THEN 'Asset Management'
		WHEN "Ticker" IN ('V','MA','AXP','DFS','COF') THEN 'Credit Services'
		ELSE NULL
	END AS "Industry",
	CASE
		WHEN "Ticker" IN ('NVO','VRTX','REGN','SGEN','MRNA','ISRG','BDX','ALC','WST','RMD','UNH','ELV','CVS','CI','HUM','LLY','JNJ','MRK','AZN','PFE') THEN 'Healthcare'
		WHEN "Ticker" IN ('QCOM','TXN','ADI','MU','ARM','CRM','SAP','INTU','NOW','ZI','AAPL','MSFT','SONY','LPL','SONO','ACN','IBM','FI','INFY','CTSH') THEN 'Technology'
		WHEN "Ticker" IN ('CPRT','KMX','PAG','LAD','AN','MBLY','APTV','MGA','LKQ','ALV','TSLA','TM','HMC','GM','F','NVDA','TSM','AVGO','AMD','INTC') THEN 'Automobiles'
		WHEN "Ticker" IN ('WD','PFSI','LDI','GHI','COOP','AFL','HIG','PRU','ALL','PGR','MS','BLK','GS','TROW','BEN','V','MA','AXP','DFS','COF') THEN 'Finance'
		ELSE NULL
	END AS "Sector"
	FROM "Combined_data";
