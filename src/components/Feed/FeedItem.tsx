import { ItineraryFeed } from "../../types";

export const FeedItem = (props: { data: ItineraryFeed }) => {
  const { data } = props;
  const date = data.uploaded_duration.toDate();
  return (
    <div className="border-1 my-7 rounded-xl overflow-hidden">
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
