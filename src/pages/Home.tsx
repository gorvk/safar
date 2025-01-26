import { SearchBar } from "../components/Search/SearchBar";
import { FeedList } from "../components/Feed/FeedList";

export const Home = () => {
  return (
    <div className="mx-8">
      <SearchBar />
      <FeedList />
    </div>
  );
};
