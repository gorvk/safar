import { ActionFunctionArgs } from "react-router-dom";
import { db } from "../../supabase";
import { TItineraryDetail, TCheckpoint, TItineraryView } from "../../types";
import { addItinerary, editItinerary } from "../../svc/itineraryForm";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const photos = JSON.parse(String(formData.get("exisiting_photos"))) as string[];
  const payload: TItineraryView = {
    ...getFormDataPayload(formData),
    photos: await getPhotoUrls(photos),
  };

  const urlParts = request.url.split("/");
  const formType = urlParts[urlParts.length - 1];

  if (formType === "add") {
    await addItinerary(payload);
  } else if (formType === "edit" && params["id"]) {
    await editItinerary(payload, params["id"]);
  }

  return null;
};

const getPhotoUrls = async (photos: string[]): Promise<string[]> => {
  const photoURLs: string[] = [];
  for (const photo of photos) {
    let current = photo;
    if (photo.split(":")[0] === "blob") {
      const blob = await fetch(current).then((r) => r.blob());
      const resourceName = crypto.randomUUID();
      await db.storage.from("itinerary-images").upload(resourceName, blob);
      const { data } = await db.storage
        .from("itinerary-images")
        .getPublicUrl(resourceName);
      current = data.publicUrl;
    }
    photoURLs.push(current);
  }
  return photoURLs;
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
