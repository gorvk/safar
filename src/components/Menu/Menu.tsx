import { useState } from "react";
import { Option } from "./Option";
import { googleAuthSvc, logoutSvc } from "../../svc/auth";
import { useDispatch, useSelector } from "react-redux";
import { TAppState } from "../../types";
import loader from "../../redux/slices/loader";
import auth from "../../redux/slices/auth";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authState = useSelector((state: TAppState) => state.auth);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const login = () => {
    dispatch(loader.actions.setloader(true));
    googleAuthSvc()
      .then((user) => dispatch(auth.actions.setAuth({ user })))
      .finally(() => {
        dispatch(loader.actions.setloader(false));
      });
  };

  const logout = () => {
    dispatch(loader.actions.setloader(true));
    logoutSvc()
      .then((user) => dispatch(auth.actions.setAuth({ user })))
      .finally(() => {
        dispatch(loader.actions.setloader(false));
      });
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center w-11 h-11 bg-app-color text-white rounded-md"
      >
        <svg
          className="w-fit h-fit"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 w-40 shadow-md rounded-md mt-4">
          <ul className="flex flex-col gap-0.5">
            {!authState.user ? (
              <li>
                <Option label="Login" handler={login} />
              </li>
            ) : (
              <li>
                <Option label="Logout" handler={logout} />
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
