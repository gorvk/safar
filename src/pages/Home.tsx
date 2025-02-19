import { SearchBar } from "../components/Search/SearchBar";
import { FeedList } from "../components/Feed/FeedList";
import { AddItineraryButton } from "../components/Itinerary/AddItineraryButton";

export const Home = () => {
  return (
    <div className="mx-8">
      <div className="flex items-center justify-between gap-5">
        <SearchBar />
        <AddItineraryButton />
      </div>
      <FeedList />
    </div>
  );
};
