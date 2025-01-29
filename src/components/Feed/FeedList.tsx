import { useState, useEffect } from "react";
import { getItineraryFeedDataSF } from "../../svc/feed";
import { TItineraryFeed } from "../../types";
import { FeedItem } from "./FeedItem";

export const FeedList = () => {
  const [feedData, setFeedData] = useState<TItineraryFeed[]>([]);
  const getData = async () => {
    const data = await getItineraryFeedDataSF();
    setFeedData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return feedData.map((data) => <FeedItem data={data} key={data.id} />);
};
