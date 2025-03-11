import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AppContext } from "./context";
import { useEffect, useState } from "react";
import { TAuthState, TFeedState } from "./types";
import { getUser, setUserMetadata } from "./svc/auth";

function App() {
  const [appLoader, setAppLoader] = useState<boolean>(false);
  const [authState, setAuthState] = useState<TAuthState>({ user: null });
  const feedState = useState<TFeedState>({
    loader: false,
    searchQuery: "",
    count: 0,
    pageNumber: 0,
  });

  const authInit = async () => {
    setAppLoader(true);
    const user = await getUser();
    setAuthState({ user });
    await setUserMetadata({
      user_id: user?.id || "",
      user_name: user?.identities?.[0].identity_data?.name || "",
    });
    setAppLoader(false);
  };

  useEffect(() => {
    authInit();
  }, []);

  return (
    <AppContext.Provider
      value={{
        feedState,
        authState: [authState, setAuthState],
        appLoader: [appLoader, setAppLoader],
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
