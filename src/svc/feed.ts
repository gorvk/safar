import { getDocs, collection, query, where, documentId, FieldPath, doc, DocumentReference } from "firebase/firestore";
import { db } from "../firebase";
import { TItineraryDetail, TItineraryFeed } from "../types";

export const getItineraryFeedDataSF = async (): Promise<TItineraryFeed[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, "itinerary_feed"));
        return querySnapshot.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id } as TItineraryFeed)
        );
    } catch (err) {
        console.error(err)
        return [];
    }
};

const getItineraryDataSF = async <T>(collectionName: string, value: string | DocumentReference, field: string | FieldPath) => {
    try {
        const itineraryFeedCollectionRef = collection(db, collectionName);
        const q = query(itineraryFeedCollectionRef, where(field, "==", value));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs[0].data() as T;
    } catch (error) {
        console.error(error)
        return {} as T
    }
}

export const getItineraryDetailDataSF = async (feedData: TItineraryFeed, id: string): Promise<TItineraryDetail> => {
    try {
        if (!feedData) {
            feedData = await getItineraryDataSF<TItineraryDetail>("itinerary_feed", id, documentId());
        }
        const feedRef = doc(db, "itinerary_feed", id);
        const detailData = await getItineraryDataSF<TItineraryDetail>("itinerary_detail", feedRef, "feed_id");
        return { ...feedData, ...detailData }
    } catch (err) {
        console.error(err)
        return {} as TItineraryDetail;
    }
};
