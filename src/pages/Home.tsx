import { SearchBar } from "../components/Search/SearchBar";
import { FeedList } from "../components/Feed/FeedList";
import { AddItineraryButton } from "../components/Itinerary/AddItineraryButton";
import { Paginator } from "../components/Feed/Paginator";

export const Home = () => {
  return (
    <div className="mx-8">
      <div className="flex items-center justify-between gap-5">
        <SearchBar />
        <AddItineraryButton />
      </div>
      <FeedList />
      <Paginator />
    </div>
  );
};
