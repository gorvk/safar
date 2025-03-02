import { useState } from "react";
import { ListUI } from "../../Icons/ListUl";
import { Trash } from "../../Icons/Trash";
import { TCheckpoint, TListItem } from "../../types";

export const CheckpointForm = (props: {
  data: TListItem<TCheckpoint>;
  deleteCheckpoint: () => void;
}) => {
  const { data, deleteCheckpoint } = props;
  const { id, value: checkpoint } = data;

  const [thingsToTry, setThingsToTry] = useState<TListItem<string>[]>(
    checkpoint.things_to_try.map((value) => ({
      value,
      id: crypto.randomUUID(),
    })) ?? []
  );

  const addThingsToTry = () => {
    setThingsToTry([...thingsToTry, { value: "", id: crypto.randomUUID() }]);
  };

  return (
    <div className="flex flex-col gap-4 bg-app-color text-white p-5 rounded-lg sm:w-1/2">
      <div className="flex w-full justify-between gap-6">
        <input
          defaultValue={checkpoint.title}
          placeholder="Checkpoint title"
          name={id +"/title"}
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
        defaultValue={checkpoint.location_url}
        placeholder="Location URL"
        name={id +"/location_url"}
        className="text-lg outline-0 w-full"
      />
      <input
        placeholder="Time picker"
        defaultValue={checkpoint.visited_at}
        name={id +"/visited_at"}
        className="text-lg outline-0"
      />
      {thingsToTry.map((thing) => (
        <input
          key={thing.id}
          defaultValue={thing.value}
          placeholder="Things to try"
          name={id +"/things_to_try"}
          className="text-lg outline-0"
        />
      ))}
    </div>
  );
};
