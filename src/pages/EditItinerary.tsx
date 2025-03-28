import {
  LoaderFunctionArgs,
  Navigate,
  useLoaderData,
  useParams,
} from "react-router-dom";
import { ItineraryForm } from "../components/Itinerary/ItineraryForm";
import { getItineraryDetailDataSF } from "../svc/feed";
import { TAppState, TItineraryView } from "../types";
import { getDate } from "../utils";
import { store } from "../redux/store";
import { useSelector } from "react-redux";
import loader from "../redux/slices/loader";

export async function clientLoader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  if (id) {
    store.dispatch(loader.actions.setloader(true));
    const detailData = await getItineraryDetailDataSF(id);
    detailData.uploaded_duration = getDate(detailData.uploaded_duration);
    detailData.checkpoints = detailData.checkpoints.map((checkpoint) => ({
      ...checkpoint,
      visited_date: getDate(checkpoint.visited_date),
    }));
    store.dispatch(loader.actions.setloader(false));
    return detailData;
  }
}

const EditItinerary = () => {
  const { id } = useParams();
  const data = useLoaderData() as TItineraryView | undefined;
  const auth = useSelector((state: TAppState) => state.auth);

  if (!data) return <></>;
  if (data.user_id !== auth.user?.user_id) return <Navigate to={`/${id}/view`} />;

  return <ItineraryForm data={data} isEditForm={true} />;
};

export default EditItinerary;