import { useNavigate, useParams } from "react-router";
import { getItineraryDetailDataSF } from "../svc/feed";
import { TAppState, TItineraryView } from "../types";
import { useEffect, useState } from "react";
import { SourceDestinationBar } from "../components/SourceDestinationBar/SourceDestinationBar";
import { MetadataBar } from "../components/MetadataBar/MetadataBar";
import { CheckpointList } from "../components/Checkpoint/CheckpointList";
import { ImageGrid } from "../components/ImageGrid/ImageGrid";
import { useDispatch, useSelector } from "react-redux";
import loader from "../redux/slices/loader";
import { getDate } from "../utils";

export const View = () => {
  const { id } = useParams();
  const [data, setData] = useState<TItineraryView>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: TAppState) => state.auth);

  const getItineraryDetailData = async () => {
    if (id) {
      dispatch(loader.actions.setloader(true));
      const detailData = await getItineraryDetailDataSF(id);
      setData(detailData);
      dispatch(loader.actions.setloader(false));
    }
  };

  useEffect(() => {
    getItineraryDetailData();
  }, []);

  if (!data) return <></>;

  if (!data.photos) data.photos = [];
  if (!data.checkpoints) data.checkpoints = [];

  return (
    <>
      <div className="flex flex-col gap-3">
        <ImageGrid photoUrls={[data.thumbnail_url, ...data.photos]} />
        <MetadataBar
          userId={data.user_id}
          timeStamp={getDate(data.uploaded_duration)}
        />
        <hr className="text-app-seperator" />
        <div className="flex justify-between">
          <div className="text-md font-bold">{data.title}</div>
          {data.user_id === auth.user?.user_id && (
            <button
              onClick={() => navigate(`/${id}/edit`)}
              className="bg-app-color text-sm uppercase py-1 min-w-14 h-fit rounded-lg font-bold text-white cursor-pointer"
            >
              Edit
            </button>
          )}
        </div>
        <div className="text-sm">
          <SourceDestinationBar
            source={data.source}
            destination={data.destination}
          />
          <CheckpointList
            checkpoints={data.checkpoints}
            itineraryId={data.feed_id}
          />
        </div>
      </div>
    </>
  );
};
