import { TCheckpoint } from "../../types";
import { CheckpointItem } from "./CheckpointItem";

export const CheckpointList = (props: { checkpoints: TCheckpoint[], itineraryId: string }) => {
  const { checkpoints, itineraryId } = props;
  return (
    <ul className="flex flex-col">
      {checkpoints.map((checkpoint, index) => (
        <CheckpointItem data={checkpoint} itineraryId={itineraryId} checkpointId={index} key={index} />
      ))}
    </ul>
  );
};
