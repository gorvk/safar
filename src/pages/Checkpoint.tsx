import { MetadataBar } from "../components/MetadataBar/MetadataBar";
import { TCheckpoint } from "../types";
import { useLocation, useParams } from "react-router-dom";
import { getItineraryDetailDataSF } from "../svc/feed";
import { useEffect, useState } from "react";
import { Location } from "../Icons/Location";

export const Checkpoint = () => {
  const location = useLocation();
  const { id, checkpointId } = useParams();
  const [checkpointData, setCheckpointData] = useState<TCheckpoint>();

  const getCheckpointData = async () => {
    if (id && checkpointId) {
      const { state } = location;
      let data: TCheckpoint = state?.data;
      if (!data) {
        const detailData = await getItineraryDetailDataSF(id);
        data = detailData.checkpoints[parseInt(checkpointId)];
      }
      data.things_to_try = data.things_to_try || [];
      setCheckpointData(data);
    }
  };

  const openUrl = (url: string | undefined) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    getCheckpointData();
  }, []);

  if (!checkpointData) {
    return <></>;
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="font-bold items-center w-full">
          {checkpointData.title.toUpperCase()}
        </div>
        {/* <hr className="text-app-sperator" /> */}
        <div className="flex w-full gap-2 justify-between">
          <div
            onClick={() => openUrl(checkpointData.location_url)}
            className="flex text-sm gap-1 rounded-md justify-evenly items-center cursor-pointer"
          >
            <div className="text-app-color font-medium underline">view on maps</div>
            <Location type="fill-app-color" />
          </div>
          <MetadataBar uploadedDuration={checkpointData.visited_at} />
        </div>
        <hr className="text-app-sperator" />
        <div>
          <ul className="flex flex-col">
            {checkpointData.things_to_try?.map((thing, index) => (
              <li key={index}>
                <div className="my-1 bg-app-color py-2 px-3 rounded-lg text-white font-medium text-sm">
                  {thing}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
