BEGIN;

	-- extensions needed
	CREATE EXTENSION IF NOT EXISTS CITEXT;
	CREATE EXTENSION IF NOT EXISTS pgcrypto; -- for gen_random_uuid()

	-- table
	CREATE TABLE IF NOT EXISTS public.users (
		key				UUID 		PRIMARY KEY DEFAULT gen_random_uuid(),
		email			CITEXT 		NOT NULL UNIQUE,
		password_hash 	TEXT 		NOT NULL,
		role			TEXT 		NOT NULL DEFAULT 'user',
		created_at		TIMESTAMPTZ NOT NULL DEFAULT NOW(),
		updated_at		TIMESTAMPTZ NOT NULL DEFAULT NOW()
	);

	-- updated_at auto-matinenance
	CREATE OR REPLACE FUNCTION set_updated_at()
	RETURNS trigger AS $$
	BEGIN
		NEW.updated_at := NOW();
		RETURN NEW;
	END;
	$$ LANGUAGE plpgsql;

	DROP TRIGGER IF EXISTS trg_users_updated_at ON public.users;
	CREATE TRIGGER trg_users_updated_at
	BEFORE UPDATE ON public.users
	FOR EACH ROW EXECUTE FUNCTION set_updated_at();

COMMIT;