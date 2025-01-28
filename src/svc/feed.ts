import { getDocs, collection, query, where, documentId, FieldPath, doc, DocumentReference } from "firebase/firestore";
import { db } from "../firebase";
import { ItineraryDetail, ItineraryFeed } from "../types";

export const getItineraryFeedData = async () => {
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

const getItineraryData = async <T>(collectionName: string, value: string | DocumentReference, field: string | FieldPath) => {
    const itineraryFeedCollectionRef = collection(db, collectionName);
    const q = query(itineraryFeedCollectionRef, where(field, "==", value));
    const querySnapshot  = await getDocs(q);
    return querySnapshot.docs[0].data() as T;
}

export const getItineraryDetailData = async (isFeedDataAvailable: boolean, id: string) => {
    let data: ItineraryDetail = {} as ItineraryDetail; 
    try {
        if (!isFeedDataAvailable) {
            data = await getItineraryData<ItineraryDetail>("itinerary_feed", id, documentId());
        }
        const feedRef = doc(db, "itinerary_feed", id);
        const detailData = await getItineraryData<ItineraryDetail>("itinerary_detail", feedRef, "feed_id");
        data = {...data, ...detailData}
        return data;
    } catch (err) {
        console.error(err)
        return data;
    }
};
