import { useEffect } from "react";
import { getPrfoileItineraryFeedDataSF } from "../svc/feed";
import { useDispatch, useSelector } from "react-redux";
import { TAppState } from "../types";
import loader from "../redux/slices/loader";
import { FeedList } from "../components/Feed/FeedList";
import feed from "../redux/slices/feed";
import { getUserSvc } from "../svc/auth";

export const Profile = () => {
  const dispatch = useDispatch();
  const {
    feed: feedState,
    loader: loaderState,
    auth,
  } = useSelector((state: TAppState) => state);

  const getPrfoileItineraryFeedData = async () => {
    const user = await getUserSvc();
    if (user) {
      dispatch(loader.actions.setloader(true));
      const { data, count } = await getPrfoileItineraryFeedDataSF(user.id);
      dispatch(feed.actions.setFeed({ ...feedState, count, data }));
      dispatch(loader.actions.setloader(false));
    }
  };
  useEffect(() => {
    dispatch(
      feed.actions.setFeed({
        pageNumber: 0,
        count: 0,
        data: [],
        searchQuery: "",
      })
    );
    getPrfoileItineraryFeedData();
  }, []);

  return !feedState.data && loaderState ? (
    <></>
  ) : (
    <>
      <div>
        Hey,{" "}
        <span className="text-2xl font-bold text-app-color uppercase">
          {auth.user?.identities?.[0].identity_data?.name}
        </span>
      </div>
      <hr className="mt-2 mb-4" />
      <div>
        <span className="text-lg font-medium">Your Itineraries -</span>
        <FeedList
          defaultData={{ count: feedState.count, data: feedState.data || [] }}
        />
      </div>
    </>
  );
};
