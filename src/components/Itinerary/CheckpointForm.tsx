import { useRef, useState } from "react";
import { ListUI } from "../../Icons/ListUl";
import { Trash } from "../../Icons/Trash";
import { TCheckpoint, TThingsToTryListItem } from "../../types";

export const CheckpointForm = (props: {
  data: TCheckpoint;
  deleteCheckpoint: () => void;
  index: number;
}) => {
  const [thingsToTry, setThingsToTry] = useState<TThingsToTryListItem[]>(
    props.data.things_to_try.map((value) => ({
      value,
      id: crypto.randomUUID(),
    })) ?? []
  );

  const ref = useRef<HTMLInputElement>(null);

  const addThingsToTry = () => {
    setThingsToTry([...thingsToTry, { value: "", id: crypto.randomUUID() }]);
  };

  return (
    <div className="flex flex-col gap-4 bg-teal-600 p-5 rounded-lg sm:w-1/2">
      <div className="flex w-full justify-between gap-6">
        <input
          defaultValue={props.data.title}
          placeholder="Checkpoint title"
          ref={ref}
          className="text-2xl outline-0 w-full"
        />
        <div className="cursor-pointer" onClick={addThingsToTry}>
          <ListUI color="fill-white" />
        </div>
        <div className="cursor-pointer" onClick={props.deleteCheckpoint}>
          <Trash />
        </div>
      </div>
      <input placeholder="Time picker" className="text-2xl outline-0" />
      {thingsToTry.map((data) => (
        <input
          key={data.id}
          defaultValue={data.value}
          placeholder="Things to try"
          className="text-2xl outline-0"
        />
      ))}
    </div>
  );
};
