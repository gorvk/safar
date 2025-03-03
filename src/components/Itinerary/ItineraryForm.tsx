import { useRef, useState } from "react";
import { Image } from "../../Icons/Image";
import { ListUI } from "../../Icons/ListUl";
import { CheckpointForm } from "./CheckpointForm";
import {
  TCheckpoint,
  TItineraryDetailDTO,
  TItineraryFeedDTO,
  TListItem,
  TUUID,
} from "../../types";
import { ImageItem } from "./ImageItem";
import { ActionFunctionArgs, Form } from "react-router-dom";
import { db } from "../../supabase";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const payload = getFormDataPayload(formData);
  const photoFiles = formData.getAll("photos") as File[];
  const photoURLs: string[] = [];

  for (const photo of photoFiles) {
    const resourceName = crypto.randomUUID() + photo.name;
    await db.storage.from("itinerary-images").upload(resourceName, photo);
    const { data } = await db.storage
      .from("itinerary-images")
      .getPublicUrl(resourceName);
    photoURLs.push(data.publicUrl);
  }
  payload.photos = [
    ...photoURLs,
    ...JSON.parse(formData.get("exisiting_photos") as string),
  ];
  const { checkpoints, destination, photos, source, title, uploaded_duration } =
    payload;

  const feedData: Partial<TItineraryFeedDTO> = {
    destination,
    source,
    thumbnail_url: photoURLs[0],
    title,
    uploaded_duration,
    user_id: "user1",
  };

  const insertedFeedData = await db
    .from("itinerary_feed")
    .insert(feedData)
    .select();

  const detailData: Partial<TItineraryDetailDTO> = {
    photos,
    checkpoints,
    feed_id: insertedFeedData.data?.[0]["id"],
  };

  await db.from("itinerary_detail").insert(detailData);
  return null;
}

const getFormDataPayload = (formData: FormData) => {
  const checkpointMap: Record<string, TCheckpoint> = {};
  const payload: Record<
    keyof TItineraryDetailDTO,
    TItineraryDetailDTO[keyof TItineraryDetailDTO]
  > = {} as TItineraryDetailDTO;
  for (const entry of formData.entries()) {
    const control = entry[0] as keyof TItineraryDetailDTO;
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
  return payload as TItineraryDetailDTO;
};

export const ItineraryForm = (props: { data?: TItineraryDetailDTO & TItineraryFeedDTO }) => {
  const { data } = props;
  const [checkpoints, setCheckpoints] = useState<TListItem<TCheckpoint>[]>(
    data?.checkpoints?.map((value) => ({
      value,
      id: crypto.randomUUID(),
    })) ?? []
  );

  const [photos, setPhotos] = useState<TListItem<string>[]>(
    data?.photos?.map((value) => ({
      value,
      id: crypto.randomUUID(),
    })) ?? []
  );

  const imageUploadInputRef = useRef<HTMLInputElement>(null);

  const addCheckpoint = () => {
    setCheckpoints([
      ...checkpoints,
      {
        id: crypto.randomUUID(),
        value: {
          things_to_try: [],
          location_url: "",
          title: "",
          visited_at: "",
        },
      } as TListItem<TCheckpoint>,
    ]);
  };

  const deleteCheckpoint = (index: number) => {
    setCheckpoints(checkpoints.filter((_, idx) => index !== idx));
  };

  const deletePhoto = (id: TUUID) => {
    setPhotos(photos.filter((value) => value.id !== id));
  };

  return (
    <div className="m-4">
      <Form method="post" encType="multipart/form-data">
        <div className="flex flex-col gap-4 mb-4">
          <input
            defaultValue={data?.title}
            placeholder="Title"
            name="title"
            className="text-5xl outline-0"
          />
          <input
            defaultValue={data?.source}
            placeholder="Source"
            name="source"
            className="text-xl outline-0"
          />
          <input
            defaultValue={data?.destination}
            placeholder="Destination"
            name="destination"
            className="text-xl outline-0"
          />
          <input
            defaultValue={data?.uploaded_duration}
            placeholder="Journey date"
            name="uploaded_duration"
            className="text-xl outline-0"
          />
          <input
            readOnly
            className="hidden"
            value={JSON.stringify(data?.photos)}
            name="exisiting_photos"
          />
        </div>
        <div className="flex items-baseline w-full overflow-x-auto gap-4 p-2">
          {photos.map((photo) => (
            <ImageItem
              key={photo.id}
              src={photo.value}
              deletePhoto={() => deletePhoto(photo.id)}
            />
          ))}
        </div>
        <hr />
        <div className="flex flex-col gap-6 my-4">
          <div className="flex gap-6 items-center">
            <label className="cursor-pointer">
              <input
                ref={imageUploadInputRef}
                className="hidden"
                placeholder="none"
                type="file"
                accept="image"
                name="photos"
                multiple={true}
              />
              <Image />
            </label>
            <div className="cursor-pointer" onClick={() => addCheckpoint()}>
              <ListUI color="fill-app-color" />
            </div>
            <button
              type="submit"
              className="bg-app-color py-1 min-w-14 rounded-lg font-bold text-white cursor-pointer"
            >
              POST
            </button>
          </div>
          {checkpoints.map((data, index) => (
            <CheckpointForm
              key={data.id}
              data={data}
              deleteCheckpoint={() => deleteCheckpoint(index)}
            />
          ))}
        </div>
      </Form>
    </div>
  );
};
