import { SearchBar } from "../components/Search/SearchBar";
import { FeedList } from "../components/Feed/FeedList";
import { AddItineraryButton } from "../components/Itinerary/AddItineraryButton";
import { Paginator } from "../components/Feed/Paginator";
import Menu from "../components/Menu/Menu";
import { useContext } from "react";
import { AppContext } from "../context";
import { Spinner } from "../Icons/Spinner";

export const Home = () => {
  const [appLoader] = useContext(AppContext).appLoader;

  if (appLoader) {
    return <Spinner />;
  }

  return (
    <div className="mx-8">
      <div className="flex items-center justify-between gap-5">
        <SearchBar />
        <AddItineraryButton />
        <Menu />
      </div>
      <FeedList />
      <Paginator />
    </div>
  );
};
