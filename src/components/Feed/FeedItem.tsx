import { useNavigate } from "react-router-dom";
import { TItineraryFeedDTO } from "../../types";
import { SourceDestinationBar } from "../SourceDestinationBar/SourceDestinationBar";
import { MetadataBar } from "../MetadataBar/MetadataBar";
import { useEffect, useState } from "react";
import { getUserMetadata } from "../../svc/auth";

export const FeedItem = (props: { data: TItineraryFeedDTO }) => {
  const { data } = props;
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const _userName = await getUserMetadata(data.user_id);
      setUserName(_userName);
    })();
  }, []);

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
          <SourceDestinationBar
            source={data.source}
            destination={data.destination}
          />
        </div>
        <MetadataBar
          userId={userName}
          uploadedDuration={data.uploaded_duration}
        />
      </div>
    </div>
  );
};
