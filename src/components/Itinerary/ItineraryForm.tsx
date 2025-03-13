import { useRef, useState } from "react";
import { Image } from "../../Icons/Image";
import { ListUI } from "../../Icons/ListUl";
import { CheckpointForm } from "./CheckpointForm";
import {
  TAppState,
  TCheckpoint,
  TItineraryView,
  TListItem,
  TUUID,
} from "../../types";
import { ImageItem } from "./ImageItem";
import { Form } from "react-router-dom";
import { Datepicker } from "./Datepicker";
import { useDispatch, useSelector } from "react-redux";
import loader from "../../redux/slices/loader";
import { googleAuthSvc } from "../../svc/auth";
import auth from "../../redux/slices/auth";

export const ItineraryForm = (props: { data?: TItineraryView }) => {
  const { data } = props;
  const user = useSelector((state: TAppState) => state.auth.user);
  const dispatch = useDispatch();

  const login = () => {
    dispatch(loader.actions.setloader(true));
    googleAuthSvc()
      .then((_user) => dispatch(auth.actions.setAuth({ user: _user })))
      .finally(() => {
        dispatch(loader.actions.setloader(false));
      });
  };

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

  const getSelectedFileUrls = (files: FileList | null) => {
    if (files) {
      const newPhotos: TListItem<string>[] = [];
      for (const file of files) {
        const url = URL.createObjectURL(file);
        newPhotos.push({
          id: crypto.randomUUID(),
          value: url,
        });
      }
      setPhotos([...photos, ...newPhotos]);
    }
  };
  if (!user) {
    return (
      <div className="absolute m-auto top-0 bottom-0 left-0 right-0 font-bold content-center">
        <div className="flex justify-center items-end">
          Please
          <button
            className="text-white mx-2 font-bold bg-app-color rounded-md py-2 px-4 cursor-pointer"
            onClick={login}
          >
            login
          </button>
          or
          <button
            className="text-white mx-2 font-bold bg-app-color rounded-md py-2 px-4 cursor-pointer"
            onClick={login}
          >
            signup
          </button>
          before continuing...
        </div>
      </div>
    );
  }
  
  return (
    <Form method="post" encType="multipart/form-data">
      <div className="flex flex-col gap-4 mb-4">
        <input
          defaultValue={data?.title}
          placeholder="Title"
          name="title"
          required={true}
          className="text-5xl outline-0"
        />
        <input
          defaultValue={data?.source}
          placeholder="Source"
          name="source"
          required={true}
          className="text-xl outline-0"
        />
        <input
          defaultValue={data?.destination}
          placeholder="Destination"
          name="destination"
          required={true}
          className="text-xl outline-0"
        />
        <Datepicker
          labelColor="text-gray-500"
          scheme="scheme-light"
          required={true}
          defaultValue={data?.uploaded_duration}
          name="uploaded_duration"
          fontSize="text-xl"
        />
        <input
          readOnly
          className="hidden"
          value={JSON.stringify(photos.map((r) => r.value))}
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
      <hr className="text-app-sperator" />
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
              onChange={(event) => getSelectedFileUrls(event.target.files)}
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
  );
};
