import React, { useContext } from "react";
import { getItineraryFeedDataSF, searchFeedSF } from "../../svc/feed";
import { debounce } from "../../utils";
import { AppContext } from "../../context";

export const SearchBar = () => {
  const [feedState, setFeedState] = useContext(AppContext).feedState;

  const searchItinerary = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFeedState({ ...feedState, loader: true });
    const searchQuery = event.target.value;
    const { data, count } = await (searchQuery
      ? searchFeedSF(searchQuery)
      : getItineraryFeedDataSF());
    setFeedState({ searchQuery, data, count: count, loader: false, pageNumber: 0 });
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
