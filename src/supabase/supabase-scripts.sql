-- search function
create function itinerary_feed_search(itinerary_feed) returns text as $$
select $1.title || ' ' || $1.source || ' ' || $1.destination;
$$ language sql immutable;

-- db policies
-- itinerary_detail
-- Enable insert for authenticated users only
alter policy "Enable insert for authenticated users only" on "public"."itinerary_detail" to authenticated with check (true);
-- Enable read access for all users
Use options above to edit alter policy "Enable read access for all users" on "public"."itinerary_detail" to public using (true);
-- Enable update for users based on uid
alter policy "Enable update for users based on uid" on "public"."itinerary_detail" to authenticated using (
    (
        (
            SELECT auth.uid() AS uid
        ) = (
            SELECT itinerary_feed.user_id
            FROM itinerary_feed
            WHERE (itinerary_feed.id = itinerary_detail.feed_id)
        )
    ) with check (
        (
            (
                SELECT auth.uid() AS uid
            ) = (
                SELECT itinerary_feed.user_id
                FROM itinerary_feed
                WHERE (itinerary_feed.id = itinerary_detail.feed_id)
            )
        )
    );

-- itinerary_feed
-- Enable insert for authenticated users only
alter policy "Enable insert for authenticated users only" on "public"."itinerary_feed" to authenticated with check (true);
-- Enable read access for all users
alter policy "Enable read access for all users" on "public"."itinerary_feed" to public using (true);
-- Enable update for users based on uid
alter policy "Enable update for users based on uid" on "public"."itinerary_feed" to authenticated using (
    (
        (
            SELECT auth.uid() AS uid
        ) = user_id
    ) with check (
        (
            (
                SELECT auth.uid() AS uid
            ) = user_id
        )
    );

-- itinerary_user_map
-- Enable insert for authenticated users only
-- Applied to:authenticated role
alter policy "Enable insert for authenticated users only" on "public"."itinerary_user_map" to authenticated with check (true);
-- Enable read access for all users
-- Applied to:public role
lter policy "Enable read access for all users" on "public"."itinerary_user_map" to public using (true);
-- Enable update for users based on uid
-- Applied to:authenticated role
alter policy "Enable update for users based on uid" on "public"."itinerary_user_map" to authenticated using (
    (
        (
            SELECT auth.uid() AS uid
        ) = user_id
    ) with check (
        (
            (
                SELECT auth.uid() AS uid
            ) = user_id
        )
    );