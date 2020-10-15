-- Deploy notes:test_schema to pg

BEGIN;

    CREATE SCHEMA IF NOT EXISTS test_schema;
    REVOKE ALL ON DATABASE test FROM public;
    GRANT CONNECT ON DATABASE test TO notes_user;
    SET search_path TO test_schema;
    ALTER ROLE notes_user IN DATABASE test SET search_path = test_schema;
    GRANT TEMP ON DATABASE test TO notes_user;
    GRANT CREATE, USAGE ON SCHEMA test_schema TO notes_user;
    ALTER DEFAULT PRIVILEGES FOR ROLE notes_owner GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON TABLES TO notes_user;
    ALTER DEFAULT PRIVILEGES FOR ROLE notes_owner GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO notes_user;

COMMIT;
