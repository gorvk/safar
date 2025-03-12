import { Outlet } from "react-router-dom";
import { Spinner } from "../../Icons/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { TAppState } from "../../types";
import { useEffect } from "react";
import auth from "../../redux/slices/auth";
import loader from "../../redux/slices/loader";
import { getUserSvc, setUserMetadata } from "../../svc/auth";

export const Layout = () => {
  const loaderState = useSelector((state: TAppState) => state.loader);
  const dispatch = useDispatch();

  const authInit = async () => {
    dispatch(loader.actions.setloader(true));
    const user = await getUserSvc();
    dispatch(auth.actions.setAuth({ user }));
    await setUserMetadata({
      user_id: user?.id || "",
      user_name: user?.identities?.[0].identity_data?.name || "",
    });
    dispatch(loader.actions.setloader(false));
  };

  useEffect(() => {
    authInit();
  }, []);
  return (
    <>
      <div className="absolute left-0 right-0 w-full min-h-full shadow-2xl bg-white mx-auto sm:max-w-3/5">
        {loaderState && (
          <div className="z-50 absolute w-full h-full bg-app-color">
            <Spinner />
          </div>
        )}
        <div className="mx-8 my-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};
