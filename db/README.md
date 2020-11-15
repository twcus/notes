# Backup and Restore
This will dump the database into a binary file that can be restored by Postgres. The restore process will drop the database first, so be sure to make another backup before restoring if you might lose data!

```
pg_dump -Fc -h localhost -U notes_owner -d notes -W > notes.bak-$(date +"%Y.%m.%d.%H.%M.%S")
pg_restore -c --verbose -h localhost -U notes_owner -W --dbname notes notes.bak-
```

To backup and restore as plain text:

```
pg_dump -h localhost -U notes_owner -d notes -W > notes.bak-$(date +"%Y.%m.%d.%H.%M.%S")
psql notes < notes.bak-
```
*Note: Restoring from plain text seems to run into errors. While it might be good to keep a backup in text format around, it is easier to restore from the binary file dump above.*

## Known Issues
If the restore fails or does not behave as expected, drop the DB manually and perform the DB setup steps again, then attempt the restore. You might also want to try `sqitch revert` and followed by `sqitch deploy`.

The DB permissions are not properly restored, so you must do that manually right now. The sqitch migration only sets the default permissions for newly created items, but does not cover items that are restored (I don't know why Postgres doesn't restore the permissions...). I need to evaluate how to handle this (either in an automated script, migration, or something else). I probably need to rethink the DB roles and permissions in general. Yay DB management.

```
grant select, update, insert, delete on all tables in schema notes_schema to notes_user;
grant select, update on all sequences in schema notes_schema to notes_user;
```