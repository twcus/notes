-- Deploy notes:notes_schema to pg

BEGIN;

    CREATE SCHEMA IF NOT EXISTS notes_schema;
    REVOKE ALL ON DATABASE notes FROM public;
    GRANT CONNECT ON DATABASE notes TO notes_user;
    SET search_path TO notes_schema;
    ALTER ROLE notes_user IN DATABASE notes SET search_path = notes_schema;
    GRANT TEMP ON DATABASE notes TO notes_user;
    GRANT CREATE, USAGE ON SCHEMA notes_schema TO notes_user;
    ALTER DEFAULT PRIVILEGES FOR ROLE notes_owner GRANT SELECT, INSERT, UPDATE, DELETE TRUNCATE ON TABLES TO notes_user;
    ALTER DEFAULT PRIVILEGES FOR ROLE notes_owner GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO notes_user;

COMMIT;
