import { initializeApp } from "firebase/app";
import { config } from "./config";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(config); 
export const db = getFirestore(app);
