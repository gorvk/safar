import { getItineraryFeedDataSF, searchFeedSF } from "../../svc/feed";
import { getPaginatationIndex } from "../../utils";
import { pageSize } from "../../constants";
import { PaginatorButton } from "./PaginatorButton";
import { useDispatch, useSelector } from "react-redux";
import loader from "../../redux/slices/loader";
import { TAppState, TFeedState } from "../../types";
import feed from "../../redux/slices/feed";

export const Paginator = () => {
  const dispatch = useDispatch();
  const feedState = useSelector((state: TAppState) => state.feed);

  const getData = async (pageNumber: number) => {
    dispatch(loader.actions.setloader(true));
    const { data, count } = await (feedState.searchQuery
      ? searchFeedSF(feedState.searchQuery, pageNumber)
      : getItineraryFeedDataSF(pageNumber));
    const newFeedState: TFeedState = { ...feedState, pageNumber, count, data };
    dispatch(feed.actions.setFeed(newFeedState));
    dispatch(loader.actions.setloader(false));
  };

  return (
    <div className="flex text-white w-fit gap-2 fixed bottom-2 left-0 right-0 m-auto">
      <PaginatorButton
        clickHandler={() => getData(feedState.pageNumber - 1)}
        isDisabled={getPaginatationIndex(feedState.pageNumber).start < pageSize}
        label="Previous"
      />
      <PaginatorButton
        clickHandler={() => getData(feedState.pageNumber + 1)}
        isDisabled={
          getPaginatationIndex(feedState.pageNumber).end >= feedState.count
        }
        label="Next"
      />
    </div>
  );
};
