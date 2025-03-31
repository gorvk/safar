import { db } from "../supabase";

export const addToStorageBucketSF = async (fileLocalUrl: string, bucketName: string) => {
    const fileBody = await fetch(fileLocalUrl).then((r) => r.blob());
    const resourceName = crypto.randomUUID();
    const { error } = await db.storage.from(bucketName).upload(resourceName, fileBody);
    if (error) console.error(error)
    return resourceName;
}

export const getBucketFileUrlSF = async (resourceName: string, bucketName: string) => {
    const { data } = await db.storage
        .from(bucketName)
        .getPublicUrl(resourceName, { transform: { width: 20, height: 20 } });
    return data;
}