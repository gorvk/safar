import { Outlet } from "react-router-dom";
import { Spinner } from "../Icons/Spinner";
import { useSelector } from "react-redux";
import { TAppState } from "../types";
import auth from "../redux/slices/auth";
import loader from "../redux/slices/loader";
import { getUserSvc, setUserMetadata } from "../svc/auth";
import { Titlebar } from "../components/Titlebar/Titlebar";
import { store } from "../redux/store";

export async function clientLoader() {
  store.dispatch(loader.actions.setloader(true));
  const user = await getUserSvc();
  store.dispatch(auth.actions.setAuth({ user }));
  await setUserMetadata({
    user_id: user?.id || "",
    user_name: user?.identities?.[0].identity_data?.name || "",
  });
  store.dispatch(loader.actions.setloader(false));
}

const Layout = () => {
  const loaderState = useSelector((state: TAppState) => state.loader);

  return (
    <>
      <div className="absolute left-0 right-0 w-full min-h-full border-x-1 border-app border-app-seperator mx-auto lg:max-w-3/5">
        <Titlebar />
        {(loaderState) && (
          <div className="z-20 absolute w-full h-full bg-white">
            <Spinner />
          </div>
        )}
        <div className="m-4 lg:m-12">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;