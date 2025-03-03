import { useParams } from "react-router";
import { getItineraryDetailDataSF } from "../svc/feed";
import { TItineraryView } from "../types";
import { useEffect, useState } from "react";
import { SourceDestinationBar } from "../components/SourceDestinationBar/SourceDestinationBar";
import { MetadataBar } from "../components/MetadataBar/MetadataBar";
import { CheckpointList } from "../components/Checkpoint/CheckpointList";
import { Spinner } from "../Icons/Spinner";
import { ImageGrid } from "../components/ImageGrid/ImageGrid";

export const View = () => {
  const { id } = useParams();
  const [data, setData] = useState<TItineraryView>();

  const getItineraryDetailData = async () => {
    if (id) {
      const detailData = await getItineraryDetailDataSF(id);
      setData(detailData);
    }
  };

  useEffect(() => {
    getItineraryDetailData();
  }, []);

  if (!data) return <Spinner />;

  if(!data.photos) data.photos = [];
  if(!data.checkpoints) data.checkpoints = [];

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
          <SourceDestinationBar source={data.source} destination={data.destination} />
        </div>
        <div>
          <CheckpointList checkpoints={data.checkpoints} itineraryId={data.id} />
        </div>
      </div>
    </>
  );
};
