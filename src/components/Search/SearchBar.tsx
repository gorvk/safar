import React from "react";
import { getItineraryFeedDataSF, searchFeedSF } from "../../svc/feed";
import { debounce } from "../../utils";
import { useDispatch } from "react-redux";
import loader from "../../redux/slices/loader";
import feed from "../../redux/slices/feed";

export const SearchBar = () => {
  const searchItinerary = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const dispatch = useDispatch();

    dispatch(loader.actions.setloader(true));
    const searchQuery = event.target.value;
    const { data, count } = await (searchQuery
      ? searchFeedSF(searchQuery)
      : getItineraryFeedDataSF());
    dispatch(loader.actions.setloader(false));
    dispatch(
      feed.actions.setFeed({
        searchQuery,
        data,
        count,
        pageNumber: 0,
      })
    );
  };

  const debouncedSearch =
    debounce<React.ChangeEvent<HTMLInputElement>>(searchItinerary);

  return (
    <div className="my-7 w-full flex items-center border-2 border-neutral-500 justify-between rounded-xl">
      <input
        type="text"
        className="w-full px-2 py-2 bg-transparent focus:outline-none"
        placeholder="Search Itineraries"
        onChange={debouncedSearch}
      />
    </div>
  );
};
