import { useEffect, useState } from "react";
import { getPrfoileItineraryFeedDataSF } from "../svc/feed";
import { useDispatch, useSelector } from "react-redux";
import { TAppState } from "../types";
import loader from "../redux/slices/loader";
import { FeedList } from "../components/Feed/FeedList";
import feed from "../redux/slices/feed";
import { useParams } from "react-router-dom";
import { getUserMetadata } from "../svc/auth";

export const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    feed: feedState,
    loader: loaderState,
    auth,
  } = useSelector((state: TAppState) => state);

  const [userName, setUserName] = useState("");

  const getPrfoileItineraryFeedData = async () => {
    if (id) {
      dispatch(loader.actions.setloader(true));
      const userName = await getUserMetadata(id);
      setUserName(userName);
      const { data, count } = await getPrfoileItineraryFeedDataSF(id);
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
        { auth.user?.id === id && `Hey, `}
        <span className="text-2xl font-bold text-app-color uppercase">
          {userName}
        </span>
      </div>
      <hr className="mt-2 mb-4 text-app-seperator" />
      <div>
        <span className="text-lg font-medium">Posts -</span>
        <FeedList
          defaultData={{ count: feedState.count, data: feedState.data || [] }}
        />
      </div>
    </>
  );
};
