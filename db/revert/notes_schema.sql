-- Revert notes:notes_schema from pg

BEGIN;

    DROP SCHEMA IF EXISTS notes_schema CASCADE;

COMMIT;
