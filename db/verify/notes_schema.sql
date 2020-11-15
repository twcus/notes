-- Verify notes:notes_schema on pg

BEGIN;

SELECT pg_catalog.has_schema_privilege('notes_schema', 'usage');

ROLLBACK;
