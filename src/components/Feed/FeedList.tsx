import { useState, useEffect } from "react";
import { getFeedData } from "../../svc/feed";
import { ItineraryFeed } from "../../types";
import { FeedItem } from "./FeedItem";

export const FeedList = () => {
  const [feedData, setFeedData] = useState<ItineraryFeed[]>([]);
  const getData = async () => {
    const data = await getFeedData();
    setFeedData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return feedData.map((data) => <FeedItem data={data} key={data.id} />);
};
