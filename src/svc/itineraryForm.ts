import { db } from "../supabase";
import { TItineraryFeed, TItineraryFeedDTO, TItineraryDetail, TItineraryView } from "../types";
import { getUserSvc } from "./auth";

export const addItinerary = async (payload: TItineraryView): Promise<void> => {
  const feedData: TItineraryFeed = await getFeedDataPayload(payload);
  const { data, error } = await db
    .from("itinerary_feed")
    .insert(feedData)
    .select<"*", TItineraryFeedDTO>();

  if (!error) {
    const detailData: TItineraryDetail = getDetailDataPayload(payload, data[0]);
    await db.from("itinerary_detail").insert(detailData);
  }
}

export const editItinerary = async (payload: TItineraryView, id: string): Promise<void> => {
  const feedData: TItineraryFeed = await getFeedDataPayload(payload);
  const { data, error } = await db
    .from("itinerary_feed")
    .update(feedData)
    .eq('id', id)
    .select<"*", TItineraryFeedDTO>();

  if (!error) {
    const detailData: TItineraryDetail = getDetailDataPayload(payload, data[0]);
    await db.from("itinerary_detail").update(detailData).eq('feed_id', id);
  }
}

const getDetailDataPayload = (
  payload: TItineraryView,
  feedData: TItineraryFeedDTO
): TItineraryDetail => {
  const { photos, checkpoints } = payload;
  return {
    photos,
    checkpoints,
    feed_id: feedData.id,
  };
};

const getFeedDataPayload = async (payload: TItineraryView): Promise<TItineraryFeed> => {
  const { destination, source, title, uploaded_duration } = payload;
  const user_id = (await getUserSvc())?.id || "";
  return {
    destination,
    source,
    user_id,
    title,
    thumbnail_url: payload.photos[0],
    uploaded_duration: new Date(uploaded_duration).toISOString(),
  };
};