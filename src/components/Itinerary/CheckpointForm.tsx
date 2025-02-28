import { useState } from "react";
import { ListUI } from "../../Icons/ListUl";
import { Trash } from "../../Icons/Trash";
import { TCheckpoint, TListItem } from "../../types";

export const CheckpointForm = (props: {
  data: TCheckpoint;
  deleteCheckpoint: () => void;
}) => {
  const { data, deleteCheckpoint } = props;

  const [thingsToTry, setThingsToTry] = useState<TListItem<string>[]>(
    data.things_to_try.map((value) => ({
      value,
      id: crypto.randomUUID(),
    })) ?? []
  );

  const addThingsToTry = () => {
    setThingsToTry([...thingsToTry, { value: "", id: crypto.randomUUID() }]);
  };

  return (
    <div className="flex flex-col gap-4 bg-app-color p-5 rounded-lg sm:w-1/2">
      <div className="flex w-full justify-between gap-6">
        <input
          defaultValue={data.title}
          placeholder="Checkpoint title"
          className="text-2xl outline-0 w-full"
        />
        <div className="cursor-pointer" onClick={addThingsToTry}>
          <ListUI color="fill-white" />
        </div>
        <div className="cursor-pointer" onClick={deleteCheckpoint}>
          <Trash />
        </div>
      </div>
      <input
        defaultValue={data.location_url}
        placeholder="Location URL"
        className="text-lg outline-0 w-full"
      />
      <input
        placeholder="Time picker"
        defaultValue={data.visited_at}
        className="text-lg outline-0"
      />
      {thingsToTry.map((data) => (
        <input
          key={data.id}
          defaultValue={data.value}
          placeholder="Things to try"
          className="text-lg outline-0"
        />
      ))}
    </div>
  );
};
