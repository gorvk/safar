import { useNavigate } from "react-router-dom";
import { TItineraryFeed } from "../../types";

export const FeedItem = (props: { data: TItineraryFeed }) => {
  const { data } = props;
  const date = data.uploaded_duration.toDate();
  const navigate = useNavigate();

  return (
    <div
      className="border-1 my-7 rounded-xl overflow-hidden"
      onClick={() => navigate(`/detail/${data.id}`, { state: { data } })}
    >
      <div>
        <img className="relative" src={data.thumbnail_url} />
      </div>
      <div className="p-4 border-t-1">
        <h1>{data.title}</h1>
        <h1>
          {data.source_destination[0] + " -> " + data.source_destination[0]}
        </h1>
        <div className="flex justify-between w-56">
          <div>{data.user_id}</div>
          <div>
            {date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
};
