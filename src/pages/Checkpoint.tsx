import { MetadataBar } from "../components/MetadataBar/MetadataBar";
import { TCheckpoint } from "../types";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getItineraryCheckpointDataSF } from "../svc/feed";
import { Location } from "../Icons/Location";
import { getDate, getTime } from "../utils";
import loader from "../redux/slices/loader";
import { store } from "../redux/store";

export async function clientLoader({ params }: LoaderFunctionArgs) {
  const { id, checkpointId } = params;
  if (id && checkpointId) {
    store.dispatch(loader.actions.setloader(true));
    const checkpoints = await getItineraryCheckpointDataSF(id);
    const data = checkpoints[parseInt(checkpointId)];
    store.dispatch(loader.actions.setloader(false));
    return data;
  }
}

const Checkpoint = () => {
  const checkpointData = useLoaderData() as TCheckpoint | undefined;

  const openUrl = (url: string | undefined) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  if (!checkpointData) return <></>;

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="font-bold items-center w-full">
          {checkpointData.title.toUpperCase()}
        </div>
        <div className="flex text-sm w-full gap-2 justify-between">
          <div
            onClick={() => openUrl(checkpointData.location_url)}
            className="flex text-sm gap-1 min-w-20 rounded-md justify-evenly items-center cursor-pointer"
          >
            <div className="text-app-secondary-color font-bold underline truncate">
              view on maps
            </div>
            <Location />
          </div>
          <MetadataBar
            timeStamp={`${getDate(checkpointData.visited_date)}, ${getTime({
              hour: checkpointData.visited_hour,
              minute: checkpointData.visited_minute,
              meridiem: checkpointData.visited_meridiem,
            })}`}
          />
        </div>
        <hr className="text-app-seperator" />
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

export default Checkpoint;