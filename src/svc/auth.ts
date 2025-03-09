import { User } from "@supabase/auth-js";
import { db } from "../supabase";

export const googleAuth = async (): Promise<User | null> => {
    const { error } = await db.auth.signInWithOAuth({
        provider: "google",
    });

    if (error) {
        return null;
    }

    const user = await getUser();
    return user;
};

export const logout = async (): Promise<User | null> => {
    await db.auth.signOut();
    const user = await getUser();
    return user;
};

export const getUser = async (): Promise<User | null> => {
    const {
        data: { user },
    } = await db.auth.getUser();

    return user;
}