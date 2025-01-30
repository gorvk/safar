import { useLocation, useParams } from "react-router";
import { getItineraryDetailDataSF } from "../svc/feed";
import { TItineraryDetail } from "../types";
import { useEffect, useState } from "react";
import { SourceDestinationBar } from "../components/SourceDestinationBar/SourceDestinationBar";
import { MetadataBar } from "../components/MetadataBar/MetadataBar";
import { CheckpointList } from "../components/Checkpoint/CheckpointList";
import { Spinner } from "../Icons/Spinner";

export const Detail = () => {
  const location = useLocation();
  const { id } = useParams();
  const [data, setData] = useState<TItineraryDetail>();

  const getItineraryDetailData = async () => {
    if (id) {
      const { state } = location;
      const feedData = state?.data;
      const detailData = await getItineraryDetailDataSF(feedData, id);
      setData(detailData);
    }
  };

  useEffect(() => {
    getItineraryDetailData();
  }, [location]);

  if (!data) return <Spinner />;

  return (
    <>
      <div className="w-full border-2 h-90 bg-black flex items-center overflow-hidden">
        <img src={data.photos[0]} className="size-fit m-auto" />
      </div>
      <div className="m-6 flex flex-col gap-2">
        <div className="text-xl font-bold">{data.title}</div>
        <MetadataBar
          userId={data.user_id}
          uploadedDuration={data.uploaded_duration}
        />
        <hr />
        <div className="text-lg">
          <SourceDestinationBar source_destination={data.source_destination} />
        </div>
        <div>
          <CheckpointList checkpoints={data.checkpoints} />
        </div>
      </div>
    </>
  );
};
