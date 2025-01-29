import { useLocation, useParams } from "react-router";
import { getItineraryDetailDataSF } from "../svc/feed";
import { TItineraryDetail } from "../types";
import { useEffect, useState } from "react";

export const Detail = () => {
  const location = useLocation();
  const { id } = useParams();
  const [data, setData] = useState<TItineraryDetail>({} as TItineraryDetail);

  const getItineraryDetailData = async () => {
    if (id) {
        const data = location.state.data as TItineraryDetail;
        const isFeedDataAvailable = data === undefined;
        const detailData = await getItineraryDetailDataSF(isFeedDataAvailable, id);
        setData(detailData);
    }
  };

  useEffect(() => {
    getItineraryDetailData();
  }, []);

  return <h1>{data.title}</h1>;
};
