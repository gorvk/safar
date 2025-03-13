import { useNavigate } from "react-router-dom";
import { TCheckpoint } from "../../types";
import { getDate } from "../../utils";
import { Location } from "../../Icons/Location"
export const CheckpointItem = (props: { data: TCheckpoint, itineraryId: string, checkpointId: number }) => {
  const { data, itineraryId, checkpointId } = props;
  const time = getDate(data.visited_at);
  const navigate = useNavigate()

  return (
    <li>
      <div className="border-r-3 h-4 w-6 border-dashed"/>
      <div onClick={() => navigate(`../${itineraryId}/${checkpointId}/view`, { state: { data } })} className="my-1 bg-app-color py-2 px-3 rounded-lg text-white font-medium flex justify-between cursor-pointer">
        <div className="flex gap-4 items-center">
          <Location type="fill-white"/>
          <div className="text-lg">{data.title}</div>
        </div>
        <div className="text-lg">{time}</div>
      </div>
    </li>
  );
};
