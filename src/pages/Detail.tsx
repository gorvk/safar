import { useLocation, useParams } from "react-router";
import { getItineraryDetailDataSF } from "../svc/feed";
import { TItineraryDetail } from "../types";
import { useEffect, useState } from "react";
import { Spinner } from "../components/Spinner/Spinner";
import { SourceDestinationBar } from "../components/SourceDestinationBar/SourceDestinationBar";
import { MetadataBar } from "../components/MetadataBar/MetadataBar";

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
      <div>
        <img className="relative" src={data.photos[0]} />
      </div>
      <div className="m-8 flex flex-col gap-2">
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
          <ul className="flex flex-col">
            {data.checkpoints.map((checkpoint, index) => (
              <li className="my-1" key={index}>
                {checkpoint.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
