import { useNavigate } from "react-router-dom";
import { TItineraryFeed } from "../../types";
import { SourceDestinationBar } from "../SourceDestinationBar/SourceDestinationBar";
import { MetadataBar } from "../MetadataBar/MetadataBar";

export const FeedItem = (props: { data: TItineraryFeed }) => {
  const { data } = props;
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
        <div className="text-lg font-bold truncate">{data.title}</div>
        <div className="text-md">
          <SourceDestinationBar source_destination={data.source_destination} />
        </div>
        <MetadataBar
          userId={data.user_id}
          uploadedDuration={data.uploaded_duration}
        />
      </div>
    </div>
  );
};
