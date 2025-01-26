import searchIcon from "../../assets/icons/search.svg";

export const SearchBar = () => {
  return (
    <div className="my-7">
      <div className="w-full flex items-center border-2 border-neutral-500 justify-between rounded-xl">
        <input
          type="text"
          className="w-full px-2 py-2 bg-transparent focus:outline-none"
          placeholder="Search Itineraries"
        />
        <div
          className="m-1 p-2 cursor-pointer"
          onClick={() => console.log("clickedddd")}
        >
          <img height="25" width="25" src={searchIcon} />
        </div>
      </div>
    </div>
  );
};
