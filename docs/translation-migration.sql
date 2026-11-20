-- ============================================================================
-- DRAFT — NOT APPLIED. Review before running in Supabase.
-- Migration: property_translations
-- Purpose:   Per-locale title/description for properties (en/fr/ru), with a review
--            workflow. The website shows and indexes a locale only when its row is
--            status='published' (see docs/translation-plan.md).
-- Touches:   new table + trigger on properties. Does not modify existing rows.
-- ============================================================================

BEGIN;

CREATE TABLE IF NOT EXISTS property_translations (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id   bigint      NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  locale        text        NOT NULL CHECK (locale IN ('en', 'fr', 'ru')),
  title         text,
  description   text        NOT NULL,
  status        text        NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft', 'in_review', 'published', 'rejected', 'stale')),
  source        text        NOT NULL DEFAULT 'ai' CHECK (source IN ('ai', 'human')),
  model         text,                 -- AI model id that produced the draft
  source_hash   text        NOT NULL, -- md5 of the Hebrew description it was translated from
  reviewed_by   text,
  reviewed_at   timestamptz,
  published_at  timestamptz,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now(),
  UNIQUE (property_id, locale)
);

CREATE INDEX IF NOT EXISTS property_translations_published_idx
  ON property_translations (property_id) WHERE status = 'published';

-- Hebrew source changed → published translations go back to review (site falls back to noindex)
CREATE OR REPLACE FUNCTION property_translations_mark_stale() RETURNS trigger AS $$
BEGIN
  IF NEW.description IS DISTINCT FROM OLD.description THEN
    UPDATE property_translations
       SET status = 'stale', updated_at = now()
     WHERE property_id = NEW.id
       AND status IN ('published', 'in_review')
       AND source_hash IS DISTINCT FROM md5(coalesce(NEW.description, ''));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS properties_translations_stale ON properties;
CREATE TRIGGER properties_translations_stale
  AFTER UPDATE OF description ON properties
  FOR EACH ROW EXECUTE FUNCTION property_translations_mark_stale();

ALTER TABLE property_translations ENABLE ROW LEVEL SECURITY;

-- Website (anon key): published rows of properties shown on the site only
DROP POLICY IF EXISTS "public_read_published" ON property_translations;
CREATE POLICY "public_read_published"
  ON property_translations FOR SELECT
  USING (
    status = 'published'
    AND EXISTS (SELECT 1 FROM properties p WHERE p.id = property_id AND p.show_on_website)
  );

-- CRM panel (logged-in users) can read everything for review
DROP POLICY IF EXISTS "auth_read_all" ON property_translations;
CREATE POLICY "auth_read_all"
  ON property_translations FOR SELECT TO authenticated USING (true);

-- CRM server (service key) writes drafts, edits and status changes
DROP POLICY IF EXISTS "service_full_access" ON property_translations;
CREATE POLICY "service_full_access"
  ON property_translations FOR ALL TO service_role USING (true) WITH CHECK (true);

COMMIT;

-- Rollback:
-- BEGIN;
-- DROP TRIGGER IF EXISTS properties_translations_stale ON properties;
-- DROP FUNCTION IF EXISTS property_translations_mark_stale();
-- DROP TABLE IF EXISTS property_translations;
-- COMMIT;
