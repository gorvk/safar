import { useEffect } from "react";
import { getItineraryFeedDataSF } from "../../svc/feed";
import { FeedItem } from "./FeedItem";
import { useDispatch, useSelector } from "react-redux";
import { TAppState, TFeedState } from "../../types";
import loader from "../../redux/slices/loader";
import feed from "../../redux/slices/feed";

export const FeedList = () => {
  const dispatch = useDispatch();
  const feedState = useSelector((state: TAppState) => state.feed);

  const getData = async () => {
    dispatch(loader.actions.setloader(true));
    const { data, count } = await getItineraryFeedDataSF();
    const newFeedState: TFeedState = { ...feedState, count, data };
    dispatch(feed.actions.setFeed(newFeedState));
    dispatch(loader.actions.setloader(false));
  };

  useEffect(() => {
    getData();
  }, []);

  return feedState.data?.map((item) => <FeedItem data={item} key={item.id} />);
};
