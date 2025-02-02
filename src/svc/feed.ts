import { db } from "../supabase";
import { TItineraryDetail, TItineraryFeed } from "../types";

export const getItineraryFeedDataSF = async (): Promise<TItineraryFeed[]> => {
    const { data, error } = await db.from('itinerary_feed').select()

    if (error) {
        console.error(error);
        return [];
    }

    return data as TItineraryFeed[];
};

export const getItineraryDetailDataSF = async (id: string): Promise<TItineraryDetail> => {
    const { data, error } = await db.from("itinerary_feed").select("*, ...itinerary_detail(*)").eq("id", id);
    
    if (error) {
        console.error(error);
        return {} as TItineraryDetail;
    }

    return data[0] as TItineraryDetail;
};
