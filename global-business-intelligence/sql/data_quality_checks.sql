-- Global Business Intelligence
-- Initial data integrity checks

SELECT 'new_llcs' AS dataset,
       COUNT(*) AS total_records,
       COUNT(DISTINCT (economy, year)) AS unique_country_years,
       COUNT(*) - COUNT(DISTINCT (economy, year)) AS duplicate_records
FROM new_llcs

UNION ALL

SELECT 'closed_llcs',
       COUNT(*),
       COUNT(DISTINCT (economy, year)),
       COUNT(*) - COUNT(DISTINCT (economy, year))
FROM closed_llcs

UNION ALL

SELECT 'total_llcs',
       COUNT(*),
       COUNT(DISTINCT (economy, year)),
       COUNT(*) - COUNT(DISTINCT (economy, year))
FROM total_llcs;
