import { useEffect } from "react";
import { getItineraryFeedDataSF } from "../../svc/feed";
import { FeedItem } from "./FeedItem";
import { useDispatch, useSelector } from "react-redux";
import { TAppState, TItineraryFeedDTO } from "../../types";
import loader from "../../redux/slices/loader";
import feed from "../../redux/slices/feed";
import { Paginator } from "./Paginator";

export const FeedList = (props: {
  defaultData?: { data: TItineraryFeedDTO[]; count: number };
}) => {
  const { defaultData } = props;
  const dispatch = useDispatch();
  const feedState = useSelector((state: TAppState) => state.feed);

  const getData = async () => {
    dispatch(loader.actions.setloader(true));
    const { data, count } = await getItineraryFeedDataSF();
    dispatch(feed.actions.setFeed({ ...feedState, count, data }));
    dispatch(loader.actions.setloader(false));
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
    if (defaultData) {
      const { data, count } = defaultData;
      dispatch(feed.actions.setFeed({ ...feedState, count, data }));
    } else {
      getData();
    }
  }, []);

  return (
    <>
      {feedState.data?.map((item) => (
        <FeedItem data={item} key={item.id} />
      ))}
      <Paginator />
    </>
  );
};
