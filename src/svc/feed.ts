import { db } from "../supabase";
import { TItineraryFeedDTO, TItineraryView } from "../types";

export const getItineraryFeedDataSF = async (): Promise<TItineraryFeedDTO[]> => {
    const { data, error } = await db.from('itinerary_feed').select()

    if (error) {
        console.error(error);
        return [];
    }

    return data as TItineraryFeedDTO[];
};

export const getItineraryDetailDataSF = async (id: string): Promise<TItineraryView> => {
    const { data, error } = await db.from("itinerary_feed").select("*, ...itinerary_detail(*)").eq("id", id);
    
    if (error) {
        console.error(error);
        return {} as TItineraryView;
    }

    return data[0] as TItineraryView;
};
