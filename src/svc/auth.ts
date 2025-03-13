import { User } from "@supabase/auth-js";
import { db } from "../supabase";

export const googleAuthSvc = async (): Promise<User | null> => {
    const { error } = await db.auth.signInWithOAuth({
        provider: "google",
    });

    if (error) {
        console.error(error);
        return null;
    }

    const user = await getUserSvc();
    return user;
};

export const logoutSvc = async (): Promise<User | null> => {
    await db.auth.signOut();
    const user = await getUserSvc();
    return user;
};

export const getUserSvc = async (): Promise<User | null> => {
    const {
        data: { user },
    } = await db.auth.getUser();

    return user;
}

export const setUserMetadata = async (payload: { user_id: string, user_name: string }) => {
    const { data, error } = await db.from("itinerary_user_map").select("*").eq("user_id", payload.user_id);

    if (data?.length === 0) {
        if (error) console.error(error);
        await db.from("itinerary_user_map").insert(payload)
    }
}

export const getUserMetadata = async (user_id: string) => {
    const { data, error } = await db.from("itinerary_user_map").select("*").eq("user_id", user_id);

    if (error) {
        console.error(error);
        return "AnOn";
    }

    return data[0].user_name;
}