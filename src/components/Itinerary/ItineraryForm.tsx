import { useState } from "react";
import { Image } from "../../Icons/Image";
import { ListUI } from "../../Icons/ListUl";
import { CheckpointForm } from "./CheckpointForm";
import { TCheckpoint, TItineraryDetail } from "../../types";

export const ItineraryForm = (props: { data?: TItineraryDetail }) => {
  const { data } = props;
  const [checkpoints, setCheckpoints] = useState<TCheckpoint[]>(
    data?.checkpoints ?? []
  );

  const addCheckpoint = () => {
    setCheckpoints([...checkpoints, {} as TCheckpoint]);
  };

  const deleteCheckpoint = (index: number) => {
    const copy = [...checkpoints];
    copy.splice(index, 1);
    setCheckpoints([...copy]);
  };

  const setCheckpoint = (index: number, data: TCheckpoint) => {
    const copy = [...checkpoints];
    copy[index].title = data.title;
    setCheckpoints([...copy]);
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
          className="text-2xl outline-0"
        />
        <input
          defaultValue={data?.destination}
          placeholder="Destination"
          className="text-2xl outline-0"
        />
        <input
          defaultValue={data?.uploaded_duration}
          placeholder="Journey date"
          className="text-2xl outline-0"
        />
      </div>
      <hr />
      <div className="flex flex-col gap-6 my-4">
        <div className="flex gap-6">
          <div className="cursor-pointer">
            <Image />
          </div>
          <div className="cursor-pointer" onClick={() => addCheckpoint()}>
            <ListUI color="fill-teal-600" />
          </div>
        </div>
        {checkpoints.map((data, index) => (
          <CheckpointForm
            key={index}
            index={index}
            data={data}
            setCheckpoint={setCheckpoint}
            deleteCheckpoint={() => deleteCheckpoint(index)}
          />
        ))}
      </div>
    </div>
  );
};
