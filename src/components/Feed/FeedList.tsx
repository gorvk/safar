import { useEffect, useContext } from "react";
import { getItineraryFeedDataSF } from "../../svc/feed";
import { FeedItem } from "./FeedItem";
import { Spinner } from "../../Icons/Spinner";
import { AppContext } from "../../context";

export const FeedList = () => {
  const [feedState, setFeedState] = useContext(AppContext).feedState;

  const getData = async () => {
    setFeedState({ ...feedState, loader: true });
    const { data, count } = await getItineraryFeedDataSF();
    setFeedState({ ...feedState, data, count: count, loader: false });
  };

  useEffect(() => {
    getData();
  }, []);

  if (feedState.loader) return <Spinner />;

  return feedState.data?.map((item) => <FeedItem data={item} key={item.id} />);
};
