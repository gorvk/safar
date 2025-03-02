import { useNavigate } from "react-router-dom";
import { TItineraryFeed } from "../../types";
import { SourceDestinationBar } from "../SourceDestinationBar/SourceDestinationBar";
import { MetadataBar } from "../MetadataBar/MetadataBar";

export const FeedItem = (props: { data: TItineraryFeed }) => {
  const { data } = props;
  const navigate = useNavigate();

  return (
    <div
      className="border-1 my-7 rounded-xl overflow-hidden cursor-pointer"
      onClick={() => navigate(`${data.id}/view`)}
    >
      <div className="bg-black">
        <img className="w-fit h-full m-auto" src={data.thumbnail_url} />
      </div>
      <div className="p-4 border-t-1">
        <div className="text-lg font-bold truncate">{data.title}</div>
        <div className="text-md">
          <SourceDestinationBar source={data.source} destination={data.destination} />
        </div>
        <MetadataBar
          userId={data.user_id}
          uploadedDuration={data.uploaded_duration}
        />
      </div>
    </div>
  );
};
