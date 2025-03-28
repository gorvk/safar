import { useNavigate } from "react-router-dom";
import { TItineraryFeedDTO } from "../../types";
import { SourceDestinationBar } from "../SourceDestinationBar/SourceDestinationBar";
import { MetadataBar } from "../MetadataBar/MetadataBar";
import { getDate } from "../../utils";

export const FeedItem = (props: { data: TItineraryFeedDTO }) => {
  const { data } = props;
  const navigate = useNavigate();

  return (
    <>
      <div
        className="my-2 rounded-xl py-4 mx-auto overflow-hidden cursor-pointer"
        onClick={() => navigate(`/${data.id}/view`)}
      >
        <div className="text-md">
          <MetadataBar
            userId={data.user_id}
            timeStamp={getDate(data.uploaded_duration)}
          />
        </div>
        <div className="w-full relative m-auto rounded-xl h-90 bg-black flex items-center my-4">
          <img className="max-h-full m-auto" src={data.thumbnail_url} />
        </div>
        <div className="text-md font-bold truncate">{data.title}</div>
        <div className="text-sm">
          <SourceDestinationBar
            source={data.source}
            destination={data.destination}
          />
        </div>
      </div>
    </>
  );
};
