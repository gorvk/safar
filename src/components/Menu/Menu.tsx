import { useContext, useState } from "react";
import { AppContext } from "../../context";
import { Option } from "./Option";
import { googleAuth, logout } from "../../svc/auth";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const appContext = useContext(AppContext);
  const [authState, setAuthState] = appContext.authState;
  const [_, setAppLoader] = appContext.appLoader;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
                <Option
                  label="Login"
                  handler={() => {
                    setAppLoader(true);
                    googleAuth()
                      .then((user) => setAuthState({ ...authState, user }))
                      .finally(() => {
                        setAppLoader(false);
                      });
                  }}
                />
              </li>
            ) : (
              <li>
                <Option
                  label="Logout"
                  handler={() => {
                    setAppLoader(true);
                    logout()
                      .then((user) => setAuthState({ ...authState, user }))
                      .finally(() => {
                        setAppLoader(false);
                      });
                  }}
                />
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
