import { useLocation, useParams } from "react-router";
import { getItineraryDetailDataSF } from "../svc/feed";
import { TItineraryDetail } from "../types";
import { useEffect, useState } from "react";

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

  if (!data) return <h1>LOADING...</h1>;

  return (
    <>
      <div>
        <h1>{data.title}</h1>
      </div>
      <div>
        <img className="relative" src={data.photos[0]} />
      </div>
    </>
  );
};
