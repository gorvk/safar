

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."itinerary_feed" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" character varying DEFAULT ''::character varying NOT NULL,
    "thumbnail_url" character varying DEFAULT ''::character varying NOT NULL,
    "source" character varying DEFAULT ''::character varying NOT NULL,
    "destination" character varying DEFAULT ''::character varying NOT NULL,
    "uploaded_duration" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL
);


ALTER TABLE "public"."itinerary_feed" OWNER TO "postgres";


COMMENT ON TABLE "public"."itinerary_feed" IS 'for itinerary feed items';



CREATE OR REPLACE FUNCTION "public"."itinerary_feed_search"("public"."itinerary_feed") RETURNS "text"
    LANGUAGE "sql" IMMUTABLE
    AS $_$
  select $1.title || ' ' || $1.source || ' ' || $1.destination;
$_$;


ALTER FUNCTION "public"."itinerary_feed_search"("public"."itinerary_feed") OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."itinerary_detail" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "feed_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "checkpoints" "jsonb"[] NOT NULL,
    "photos" "text"[] NOT NULL
);


ALTER TABLE "public"."itinerary_detail" OWNER TO "postgres";


COMMENT ON TABLE "public"."itinerary_detail" IS 'for itinerary detail page';



CREATE TABLE IF NOT EXISTS "public"."itinerary_user_map" (
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "user_name" character varying DEFAULT ''::character varying NOT NULL,
    "profile_pic" "text" DEFAULT ''::"text"
);


ALTER TABLE "public"."itinerary_user_map" OWNER TO "postgres";


COMMENT ON TABLE "public"."itinerary_user_map" IS 'for storing custom username and profile pic';



ALTER TABLE ONLY "public"."itinerary_detail"
    ADD CONSTRAINT "itinerary_detail_feed_id_key" UNIQUE ("feed_id");



ALTER TABLE ONLY "public"."itinerary_detail"
    ADD CONSTRAINT "itinerary_detail_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."itinerary_feed"
    ADD CONSTRAINT "itinerary_feed_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."itinerary_user_map"
    ADD CONSTRAINT "itinerary_user_map_pkey" PRIMARY KEY ("user_id");



CREATE INDEX "itinerary_feed_title_source_destination_idx" ON "public"."itinerary_feed" USING "btree" ("title", "source", "destination");



ALTER TABLE ONLY "public"."itinerary_detail"
    ADD CONSTRAINT "itinerary_detail_feed_id_fkey" FOREIGN KEY ("feed_id") REFERENCES "public"."itinerary_feed"("id") ON UPDATE CASCADE ON DELETE CASCADE;



CREATE POLICY "Enable delete for users based on user_id" ON "public"."itinerary_feed" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable insert for authenticated users only" ON "public"."itinerary_detail" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable insert for authenticated users only" ON "public"."itinerary_feed" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable insert for authenticated users only" ON "public"."itinerary_user_map" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable read access for all users" ON "public"."itinerary_detail" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."itinerary_feed" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."itinerary_user_map" FOR SELECT USING (true);



CREATE POLICY "Enable update for users based on uid" ON "public"."itinerary_detail" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = ( SELECT "itinerary_feed"."user_id"
   FROM "public"."itinerary_feed"
  WHERE ("itinerary_feed"."id" = "itinerary_detail"."feed_id")))) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = ( SELECT "itinerary_feed"."user_id"
   FROM "public"."itinerary_feed"
  WHERE ("itinerary_feed"."id" = "itinerary_detail"."feed_id"))));



CREATE POLICY "Enable update for users based on uid" ON "public"."itinerary_feed" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable update for users based on uid" ON "public"."itinerary_user_map" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



ALTER TABLE "public"."itinerary_detail" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."itinerary_feed" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."itinerary_user_map" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";




















































































































































































GRANT ALL ON TABLE "public"."itinerary_feed" TO "anon";
GRANT ALL ON TABLE "public"."itinerary_feed" TO "authenticated";
GRANT ALL ON TABLE "public"."itinerary_feed" TO "service_role";



GRANT ALL ON FUNCTION "public"."itinerary_feed_search"("public"."itinerary_feed") TO "anon";
GRANT ALL ON FUNCTION "public"."itinerary_feed_search"("public"."itinerary_feed") TO "authenticated";
GRANT ALL ON FUNCTION "public"."itinerary_feed_search"("public"."itinerary_feed") TO "service_role";


















GRANT ALL ON TABLE "public"."itinerary_detail" TO "anon";
GRANT ALL ON TABLE "public"."itinerary_detail" TO "authenticated";
GRANT ALL ON TABLE "public"."itinerary_detail" TO "service_role";



GRANT ALL ON TABLE "public"."itinerary_user_map" TO "anon";
GRANT ALL ON TABLE "public"."itinerary_user_map" TO "authenticated";
GRANT ALL ON TABLE "public"."itinerary_user_map" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
