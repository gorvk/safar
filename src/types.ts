import { Timestamp } from "firebase/firestore";

export type ItineraryFeed = {
    id: string;
    title: string;
    user_id: string;
    thumbnail_url: string;
    source_destination: string[];
    uploaded_duration: Timestamp;
}

export type ItineraryDetail = ItineraryFeed & { 
    checkpoints: {}[];
    photos: {}[];
}