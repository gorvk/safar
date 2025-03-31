import { useState } from "react";
import { Option } from "./Option";
import { googleAuthSvc, logoutSvc } from "../../svc/auth";
import { useDispatch, useSelector } from "react-redux";
import { TAppState } from "../../types";
import loader from "../../redux/slices/loader";
import auth from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import { HamMenu } from "../../Icons/HamMenu";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authState = useSelector((state: TAppState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const anonOptions = [{ label: "Login", handler: login }];
  const userOptions = [
    {
      label: "Profile",
      handler: () => navigate(`${authState.user?.user_id}/profile`),
    },
    { label: "Logout", handler: logout },
  ];
  const commonOptions = [{ label: "About", handler: () => navigate("/about") }];

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center w-10 h-10 bg-app-color text-white rounded-md cursor-pointer"
      >
        <HamMenu />
      </button>

      {isOpen && (
        <div className="absolute right-0 w-40 shadow-md rounded-md mt-3">
          <ul className="flex flex-col z-10">
            {[
              ...(!authState.user ? anonOptions : userOptions),
              ...commonOptions,
            ].map((option, index) => (
              <li className="z-10" key={index}>
                {index !== 0 && <hr className="text-app-color-light"/>}
                <Option label={option.label} handler={option.handler} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
