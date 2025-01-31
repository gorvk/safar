import { SourceDestinationBar } from "../components/SourceDestinationBar/SourceDestinationBar";
import { MetadataBar } from "../components/MetadataBar/MetadataBar";
import { TCheckpoint } from "../types";
import { useLocation, useParams } from "react-router-dom";
import { getItineraryDetailDataSF } from "../svc/feed";
import { useEffect, useState } from "react";
import { Spinner } from "../Icons/Spinner";
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
        const detailData = await getItineraryDetailDataSF(undefined, id);
        data = detailData.checkpoints[parseInt(checkpointId)];
      }
      setCheckpointData(data);
    }
  };

  useEffect(() => {
    getCheckpointData();
  }, []);

  if (!checkpointData) {
    return <Spinner />;
  }

  return (
    <>
      <div className="m-6 flex flex-col gap-2">
        <div className="text-xl font-bold flex justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.open(checkpointData.location_url, "_blank")}
          >
            <Location type="fill-black" />
            {checkpointData.title.toUpperCase()}
          </div>
          <MetadataBar uploadedDuration={checkpointData.visited_at} />
        </div>
        <hr />
        <div className="text-lg">
          <SourceDestinationBar
            source_destination={["Things to Try".toUpperCase()]}
          />
        </div>
        <div>
          <ul className="flex flex-col">
            {checkpointData.things_to_try.map((thing, index) => (
              <li key={index}>
                <div className="my-1 bg-teal-600 py-2 px-3 rounded-lg text-white font-medium flex justify-between cursor-pointer text-lg">
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
