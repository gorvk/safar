import { useState } from "react";
import { Image } from "../../Icons/Image";
import { ListUI } from "../../Icons/ListUl";
import { CheckpointForm } from "./CheckpointForm";
import { TCheckpoint, TItineraryDetail, TListItem, TUUID } from "../../types";
import { ImageItem } from "./ImageItem";

export const ItineraryForm = (props: { data?: TItineraryDetail }) => {
  const { data } = props;
  const [checkpoints, setCheckpoints] = useState<TListItem<TCheckpoint>[]>(
    data?.checkpoints.map((value) => ({
      value,
      id: crypto.randomUUID(),
    })) ?? []
  );

  const [photos, setPhotos] = useState<TListItem<string>[]>(
    data?.photos.map((value) => ({
      value,
      id: crypto.randomUUID(),
    })) ?? []
  );

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
      <div className="flex flex-col gap-4 mb-4">
        <input
          defaultValue={data?.title}
          placeholder="Title"
          className="text-5xl outline-0"
        />
        <input
          defaultValue={data?.source}
          placeholder="Source"
          className="text-xl outline-0"
        />
        <input
          defaultValue={data?.destination}
          placeholder="Destination"
          className="text-xl outline-0"
        />
        <input
          defaultValue={data?.uploaded_duration}
          placeholder="Journey date"
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
          <div className="cursor-pointer">
            <Image />
          </div>
          <div className="cursor-pointer" onClick={() => addCheckpoint()}>
            <ListUI color="fill-app-color" />
          </div>
          <button className="bg-app-color py-1 w-14 rounded-lg font-bold text-white cursor-pointer">POST</button>
        </div>
        {checkpoints.map((data, index) => (
          <CheckpointForm
            key={data.id}
            data={data.value}
            deleteCheckpoint={() => deleteCheckpoint(index)}
          />
        ))}
      </div>
    </div>
  );
};
