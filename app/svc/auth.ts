import type { User } from "@supabase/supabase-js";
import { db } from "../supabase";
import { TUserDTO } from "../types";

export const googleAuthSvc = async (): Promise<TUserDTO | null> => {
    const { error } = await db.auth.signInWithOAuth({
        provider: "google",
    });

    if (error) {
        console.log(error);
        return null;
    }

    const user = await getUserSvc();
    if (user) return await getUserMetadata(user.id);

    return null;
};

export const logoutSvc = async (): Promise<TUserDTO | null> => {
    await db.auth.signOut();
    const user = await getUserSvc();
    if (user) return await getUserMetadata(user.id);
    return null;
};

export const getUserSvc = async (): Promise<User | null> => {
    const {
        error,
        data: { user },
    } = await db.auth.getUser();

    if (error) {
        console.log(error);
        return null;
    }

    return user;
}

export const setUserMetadata = async (payload: TUserDTO): Promise<TUserDTO | null> => {
    const { data, error } = await db.from("itinerary_user_map").select<"*", TUserDTO>("*").eq("user_id", payload.user_id);

    if (data?.length === 0) {
        if (error) console.log(error);
        const res = await db.from("itinerary_user_map").insert(payload).select<"*", TUserDTO>();
        if (!error && res.data) {
            return res.data[0];
        }
    }

    return data?.[0] || null;
}

export const updateUserMetaData = async (payload: TUserDTO): Promise<TUserDTO | null> => {
    const { data, error } = await db.from("itinerary_user_map").update(payload)
    .eq('user_id', payload.user_id)
    .select<"*", TUserDTO>();
    if (!error && data) {
        return data[0];
    }
    return null;
}

export const getUserMetadata = async (user_id: string): Promise<TUserDTO | null> => {
    const { data, error } = await db.from("itinerary_user_map").select<"*", TUserDTO>("*").eq("user_id", user_id);

    if (error) {
        console.log(error);
        return null;
    }

    return data[0];
}