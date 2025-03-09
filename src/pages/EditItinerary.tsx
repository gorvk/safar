import { useParams } from "react-router-dom";
import { ItineraryForm } from "../components/Itinerary/ItineraryForm";
import { getItineraryDetailDataSF } from "../svc/feed";
import { useEffect, useState } from "react";
import { TItineraryView } from "../types";
import { Spinner } from "../Icons/Spinner";
import { getDate } from "../utils";

export const EditItinerary = () => {
  const { id } = useParams();
  const [data, setData] = useState<TItineraryView>();

  const getItineraryDetailData = async () => {
    if (id) {
      let detailData = await getItineraryDetailDataSF(id);
      detailData.uploaded_duration = getDate(detailData.uploaded_duration);
      detailData.checkpoints = detailData.checkpoints.map((checkpoint) => ({
        ...checkpoint,
        visited_at: getDate(checkpoint.visited_at),
      }));
      setData(detailData);
    }
  };

  useEffect(() => {
    getItineraryDetailData();
  }, []);

  if (!data) return <Spinner />;

  return <ItineraryForm data={data} />;
};
