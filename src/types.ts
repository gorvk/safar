import { User } from "@supabase/auth-js";

export type TItineraryFeed = {
    title: string;
    user_id: string;
    thumbnail_url: string;
    source: string;
    destination: string;
    uploaded_duration: string;
}

export type TItineraryDetail = {
    feed_id: string;
    checkpoints: TCheckpoint[];
    photos: string[];
};

export type TItineraryDetailDTO = TItineraryDetail & {
    id: string;
}

export type TItineraryFeedDTO = TItineraryFeed & {
    id: string;
}

export type TItineraryView = TItineraryDetailDTO & TItineraryFeedDTO;


export type TCheckpoint = {
    title: string;
    location_url: string | undefined;
    visited_date: string;
    visited_hour: string;
    visited_minute: string;
    visited_meridiem: string;
    things_to_try: string[] | undefined;
};

export type TSupabaseConfig = {
    supabaseUrl: string;
    supabaseKey: string;
}

export type TUUID = `${string}-${string}-${string}-${string}-${string}`

export type TListItem<T> = {
    id: TUUID;
    value: T;
}

export type TFeedState = {
    data?: TItineraryFeedDTO[];
    searchQuery: string;
    count: number;
    pageNumber: number;
}

export type TAuthState = {
    user: User | null;
}

export type TAppState = {
    loader: boolean;
    auth: TAuthState;
    feed: TFeedState;
}

export type TTimepickerState = {
    hour: string;
    minute: string;
    meridiem: string;
};