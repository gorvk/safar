import { useRef, useState } from "react";
import { ListUI } from "../../Icons/ListUl";
import { Trash } from "../../Icons/Trash";
import { TCheckpoint } from "../../types";

export const CheckpointForm = (props: {
  data: TCheckpoint;
  deleteCheckpoint: () => void;
  setCheckpoint: (index: number, data: TCheckpoint) => void;
  index: number;
}) => {
  const [thingsToTry, setThingsToTry] = useState<string[]>(
    props.data.things_to_try ?? []
  );

  const ref = useRef<HTMLInputElement>(null);

  const addThingsToTry = () => {
    setThingsToTry([...thingsToTry, ""]);
  };

  return (
    <div className="flex flex-col gap-4 bg-teal-600 p-5 rounded-lg sm:w-1/2">
      <div className="flex w-full justify-between gap-6">
        <input
          defaultValue={props.data.title}
          placeholder="Checkpoint title"
          ref={ref}
          onChange={() =>
            props.setCheckpoint(props.index, {
              ...props.data,
              title: ref.current?.value || "",
            })
          }
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
      {thingsToTry.map((value, index) => (
        <input
          key={index}
          defaultValue={value}
          placeholder="Things to try"
          className="text-2xl outline-0"
        />
      ))}
    </div>
  );
};
