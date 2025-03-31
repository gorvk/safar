import { Navigate, useParams } from "react-router-dom";
import { ItineraryForm } from "../components/Itinerary/ItineraryForm";
import { getItineraryDetailDataSF } from "../svc/feed";
import { useEffect, useState } from "react";
import { TAppState, TItineraryView } from "../types";
import { getDate } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import loader from "../redux/slices/loader";

export const EditItinerary = () => {
  const { id } = useParams();
  const [data, setData] = useState<TItineraryView>();
  const auth = useSelector((state: TAppState) => state.auth);
  const dispatch = useDispatch();

  const getItineraryDetailData = async () => {
    if (id) {
      dispatch(loader.actions.setloader(true));
      const detailData = await getItineraryDetailDataSF(id);
      detailData.uploaded_duration = getDate(detailData.uploaded_duration);
      detailData.checkpoints = detailData.checkpoints.map((checkpoint) => ({
        ...checkpoint,
        visited_date: getDate(checkpoint.visited_date),
      }));
      setData(detailData);
      dispatch(loader.actions.setloader(false));
    }
  };

  useEffect(() => {
    getItineraryDetailData();
  }, []);

  if (!data) return <></>;

  if (data.user_id !== auth.user?.user_id) {
    return <Navigate to={`/${id}/view`} />;
  }

  return <ItineraryForm data={data} isEditForm={true} />;
};
