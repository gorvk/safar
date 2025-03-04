import { ActionFunctionArgs } from "react-router-dom";
import { db } from "../../supabase";
import {
  TItineraryDetail,
  TCheckpoint,
  TItineraryView,
} from "../../types";
import { addItinerary } from "../../svc/itineraryForm";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const photoFiles = formData.getAll("photos") as File[];
  const payload: TItineraryView = {
    ...getFormDataPayload(formData),
    photos: await getPhotoUrls(
      photoFiles,
      String(formData.get("exisiting_photos"))
    ),
  };

  const urlParts = request.url.split("/");
  console.log(urlParts[urlParts.length - 1]);
  console.log(params["id"]);

  await addItinerary(payload)
  return null;
};

const getPhotoUrls = async (
  newPhotos: File[],
  exisitingPhotos: string
): Promise<string[]> => {
  const photoURLs: string[] = [];
  for (const photo of newPhotos) {
    const resourceName = crypto.randomUUID() + photo.name;
    await db.storage.from("itinerary-images").upload(resourceName, photo);
    const { data } = await db.storage
      .from("itinerary-images")
      .getPublicUrl(resourceName);
    photoURLs.push(data.publicUrl);
  }

  return [...photoURLs, ...JSON.parse(exisitingPhotos)];
};

const getFormDataPayload = (formData: FormData) => {
  const checkpointMap: Record<string, TCheckpoint> = {};
  const payload: Record<
    keyof TItineraryDetail,
    TItineraryDetail[keyof TItineraryDetail]
  > = {} as TItineraryDetail;
  for (const entry of formData.entries()) {
    const control = entry[0] as keyof TItineraryDetail;
    const controlValue = entry[1];
    const controlMetadata = control.split("/");
    const id = controlMetadata[0];
    const name = controlMetadata[1] as keyof TCheckpoint;
    let current = checkpointMap[id];
    if (id && name) {
      if (current) {
        if (name === "things_to_try") {
          current[name] = current[name]
            ? [...current[name], String(controlValue)]
            : [String(controlValue)];
        } else {
          current[name] = String(controlValue);
        }
      } else {
        if (name === "things_to_try") {
          current = { [name]: [String(controlValue)] } as TCheckpoint;
        } else {
          current = {} as TCheckpoint;
          current[name] = String(controlValue);
        }
      }
      checkpointMap[id] = current;
    } else {
      payload[control] = String(controlValue);
    }
  }
  payload["checkpoints"] = Object.values(checkpointMap);
  return payload as TItineraryView;
};
