import { useParams } from "react-router-dom";
import { ItineraryForm } from "../components/Itinerary/ItineraryForm";
import { getItineraryDetailDataSF } from "../svc/feed";
import { useEffect, useState } from "react";
import { TItineraryDetailDTO } from "../types";
import { Spinner } from "../Icons/Spinner";

export const EditItinerary = () => {
  const { id } = useParams();
  const [data, setData] = useState<TItineraryDetailDTO>();

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

  return <ItineraryForm data={data} />;
};
