import { TSupabaseConfig } from "../types";

export const config: TSupabaseConfig = {
    supabaseUrl: process.env.SUPABASE_URL || "",
    supabaseKey: process.env.SUPABASE_KEY || "",
}