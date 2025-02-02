export type TItineraryFeed = {
    id: string;
    title: string;
    user_id: string;
    thumbnail_url: string;
    source: string;
    destination: string;
    uploaded_duration: string;
}

export type TItineraryDetail = TItineraryFeed & {
    checkpoints: TCheckpoint[];
    photos: string[];
}

export type TCheckpoint = {
    title: string;
    location_url: string;
    visited_at: string;
    things_to_try: string[];
};

export type TSupabaseConfig = {
    supabaseUrl: string; 
    supabaseKey: string;
}