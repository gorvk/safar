import { useState, useEffect } from "react";
import { getItineraryFeedDataSF } from "../../svc/feed";
import { TItineraryFeedDTO } from "../../types";
import { FeedItem } from "./FeedItem";
import { Spinner } from "../../Icons/Spinner";

export const FeedList = () => {
  const [feedData, setFeedData] = useState<TItineraryFeedDTO[]>();
  const getData = async () => {
    const data = await getItineraryFeedDataSF();
    setFeedData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!feedData) return <Spinner />;

  return feedData.map((data) => <FeedItem data={data} key={data.id} />);
};
