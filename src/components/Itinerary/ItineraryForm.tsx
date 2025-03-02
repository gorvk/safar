import { useRef, useState } from "react";
import { Image } from "../../Icons/Image";
import { ListUI } from "../../Icons/ListUl";
import { CheckpointForm } from "./CheckpointForm";
import { TCheckpoint, TItineraryDetail, TListItem, TUUID } from "../../types";
import { ImageItem } from "./ImageItem";
import { ActionFunctionArgs, Form } from "react-router-dom";
import { db } from "../../supabase";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const payload = getFormDataPayload(formData);
  const photos = formData.getAll("photos") as File[];
  for (const photo of photos) {
    await db.storage.from("itinerary-images").upload(photo.name, photo);
    const { data } = await db.storage.from('itinerary-images').getPublicUrl(photo.name);
    payload.photos = payload.photos ? [data.publicUrl] : [...payload.photos, data.publicUrl];
  }
  return null;
}

const getFormDataPayload = (formData: FormData) => {
  const checkpointMap: Record<string, TCheckpoint> = {};
  const payload: Record<keyof TItineraryDetail, TItineraryDetail[keyof TItineraryDetail]> = {} as TItineraryDetail;
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
          current[name] = current[name] ? [...current[name], String(controlValue)] : [String(controlValue)];
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
  return payload as TItineraryDetail;
};

export const ItineraryForm = (props: { data?: TItineraryDetail }) => {
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
