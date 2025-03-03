import { db } from "../supabase";
import { TItineraryDetailDTO, TItineraryFeedDTO } from "../types";

export const getItineraryFeedDataSF = async (): Promise<TItineraryFeedDTO[]> => {
    const { data, error } = await db.from('itinerary_feed').select()

    if (error) {
        console.error(error);
        return [];
    }

    return data as TItineraryFeedDTO[];
};

export const getItineraryDetailDataSF = async (id: string): Promise<TItineraryDetailDTO> => {
    const { data, error } = await db.from("itinerary_feed").select("*, ...itinerary_detail(*)").eq("id", id);
    
    if (error) {
        console.error(error);
        return {} as TItineraryDetailDTO;
    }

    return data[0] as TItineraryDetailDTO;
};
