import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AppContext } from "./context";
import { useEffect, useState } from "react";
import { TAuthState, TFeedState } from "./types";
import { db } from "./supabase";

function App() {
  const appLoader = useState<boolean>(false);
  const authState = useState<TAuthState>({ user: null });
  const feedState = useState<TFeedState>({
    loader: false,
    searchQuery: "",
    count: 0,
    pageNumber: 0,
  });

  const authInit = async () => {
    appLoader[1](true);
    const {
      data: { user },
    } = await db.auth.getUser();
    authState[1]({ user });
    appLoader[1](false);
  };

  useEffect(() => {
    authInit();
  }, []);

  return (
    <AppContext.Provider value={{ feedState, authState, appLoader }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
