import { Timestamp } from "firebase/firestore";

export const getDate = (timeStamp: Timestamp) => {
    const timeStampInstance = new Timestamp(timeStamp.seconds, timeStamp.nanoseconds);
    const date = timeStampInstance.toDate();
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
}

export const getTime = (timeStamp: Timestamp) => {
    const timeStampInstance = new Timestamp(timeStamp.seconds, timeStamp.nanoseconds);
    return timeStampInstance.toDate().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}