import { SearchBar } from "../components/Search/SearchBar";
import { FeedList } from "../components/Feed/FeedList";
import { AddItineraryButton } from "../components/Itinerary/AddItineraryButton";
import Menu from "../components/Menu/Menu";

export const Home = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-5">
        <SearchBar />
        <AddItineraryButton />
        <Menu />
      </div>
      <FeedList />
    </>
  );
};
