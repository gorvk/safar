import { useContext } from "react";
import { AppContext } from "../../context";
import { getItineraryFeedDataSF, searchFeedSF } from "../../svc/feed";
import { getPaginatationIndex } from "../../utils";
import { pageSize } from "../../constants";
import { PaginatorButton } from "./PaginatorButton";

export const Paginator = () => {
  const [feedState, setFeedState] = useContext(AppContext).feedState;

  const getData = async (_pageNumber: number) => {
    setFeedState({ ...feedState, loader: true });

    const { data, count } = await (feedState.searchQuery
      ? searchFeedSF(feedState.searchQuery, _pageNumber)
      : getItineraryFeedDataSF(_pageNumber));

    setFeedState({
      ...feedState,
      data,
      count,
      loader: false,
      pageNumber: _pageNumber,
    });
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
