import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { ItineraryFeed } from "../types";

export const getFeedData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "itinerary_feed"));
        return querySnapshot.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id } as ItineraryFeed)
        );
    } catch (err) {
        console.error(err)
        return [];
    }
};