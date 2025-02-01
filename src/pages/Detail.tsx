import { useLocation, useParams } from "react-router";
import { getItineraryDetailDataSF } from "../svc/feed";
import { TItineraryDetail } from "../types";
import { useEffect, useState } from "react";
import { SourceDestinationBar } from "../components/SourceDestinationBar/SourceDestinationBar";
import { MetadataBar } from "../components/MetadataBar/MetadataBar";
import { CheckpointList } from "../components/Checkpoint/CheckpointList";
import { Spinner } from "../Icons/Spinner";
import { ImageGrid } from "../components/ImageGrid/ImageGrid";

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
      <ImageGrid photoUrls={[data.thumbnail_url, ...data.photos]} />
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
          <CheckpointList checkpoints={data.checkpoints} itineraryId={data.id} />
        </div>
      </div>
    </>
  );
};
