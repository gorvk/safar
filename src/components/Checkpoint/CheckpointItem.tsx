import { useNavigate } from "react-router-dom";
import { TCheckpoint } from "../../types";
import { getDate, getTime } from "../../utils";
import { Location } from "../../Icons/Location";
export const CheckpointItem = (props: {
  data: TCheckpoint;
  itineraryId: string;
  checkpointId: number;
}) => {
  const { data, itineraryId, checkpointId } = props;
  const date = getDate(data.visited_date);
  const time = getTime({
    hour: data.visited_hour,
    minute: data.visited_minute,
    meridiem: data.visited_meridiem,
  });
  const navigate = useNavigate();

  return (
    <li>
      <div className="border-r-3 h-4 w-6 border-dashed" />
      <div
        onClick={() =>
          navigate(`../${itineraryId}/${checkpointId}/view`, {
            state: { data },
          })
        }
        className="my-1 bg-app-color py-2 px-3 rounded-lg flex justify-between cursor-pointer text-white"
      >
        <div className="flex gap-4 items-center w-3/5">
          <Location type="fill-app-secondary-color" />
          <div className="truncate font-bold">{data.title}</div>
        </div>
        <div>
          <div>{date}</div>
          <div>{time}</div>
        </div>
      </div>
    </li>
  );
};
