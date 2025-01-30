import { TCheckpoint } from "../../types";
import { CheckpointItem } from "./CheckpointItem";

export const CheckpointList = (props: { checkpoints: TCheckpoint[] }) => {
  const { checkpoints } = props;
  return (
    <ul className="flex flex-col">
      {checkpoints.map((checkpoint, index) => (
        <CheckpointItem checkpoint={checkpoint} key={index} />
      ))}
    </ul>
  );
};
