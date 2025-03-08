import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AppContext } from "./context";
import { useState } from "react";
import { FeedState } from "./types";

function App() {
  const searchState = useState<FeedState>({
    loader: false,
    searchQuery: "",
    count: 0,
    pageNumber: 0,
  });

  return (
    <AppContext.Provider value={{ feedState: searchState }}>
      <RouterProvider router={router} />;
    </AppContext.Provider>
  );
}

export default App;
