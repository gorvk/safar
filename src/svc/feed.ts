import { db } from "../supabase";
import { TCheckpoint, TItineraryFeedDTO, TItineraryView } from "../types";
import { getPaginatationIndex } from "../utils";

export const getItineraryFeedDataSF = async (pageNumber?: number): Promise<{ data: TItineraryFeedDTO[], count: number }> => {
    const { start, end } = getPaginatationIndex(pageNumber);
    const { data, count, error } = await db.from('itinerary_feed')
        .select<"*", TItineraryFeedDTO>("*", { count: 'exact' })
        .range(start, end - 1);

    if (!count) {
        if (error) console.error(error);
        return { data: [], count: 0 };
    }

    return { data, count };
};

export const getPrfoileItineraryFeedDataSF = async (uid: string, pageNumber?: number): Promise<{ data: TItineraryFeedDTO[], count: number }> => {
    const { start, end } = getPaginatationIndex(pageNumber);
    const { data, count, error } = await db.from('itinerary_feed')
        .select<"*", TItineraryFeedDTO>("*", { count: 'exact' }).eq("user_id", uid)
        .range(start, end - 1);

    if (!count) {
        if (error) console.error(error);
        return { data: [], count: 0 };
    }

    return { data, count };
};

export const getItineraryDetailDataSF = async (id: string): Promise<TItineraryView> => {
    const { data, error } = await db.from("itinerary_feed").select("*, ...itinerary_detail(*)").eq("id", id);

    if (error) {
        console.error(error);
        return {} as TItineraryView;
    }

    return data[0] as TItineraryView;
};

export const getItineraryCheckpointDataSF = async (id: string): Promise<TCheckpoint[]> => {
    const { data, error } = await db.from("itinerary_feed").select("...itinerary_detail(checkpoints)").eq("id", id);

    if (error || !data) {
        console.error(error);
        return [];
    }

    return data[0].checkpoints as TCheckpoint[];
};

export const searchFeedSF = async (query: string, pageNumber?: number): Promise<{ data: TItineraryFeedDTO[], count: number }> => {
    const { start, end } = getPaginatationIndex(pageNumber);
    const { data, error, count } = await db.from("itinerary_feed")
        .select<"*", TItineraryFeedDTO>("*", { count: 'exact' })
        .textSearch("itinerary_feed_search", `${query}:*`).range(start, end - 1);

    if (!count) {
        if (error) console.error(error);
        return { data: [], count: 0 };
    }

    return { data, count };
}

