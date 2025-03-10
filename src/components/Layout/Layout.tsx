import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "../../context";
import { Spinner } from "../../Icons/Spinner";

export const Layout = () => {
  const [appLoader] = useContext(AppContext).appLoader;

  return (
    <div className="absolute left-0 right-0 w-full min-h-full shadow-2xl bg-white mx-auto sm:max-w-3/5">
      {(appLoader) ? <Spinner /> : <Outlet />}
    </div>
  );
};
