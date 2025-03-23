import { useNavigate } from "react-router-dom";
import { appName } from "../../constants";
import { BackButton } from "./BackButton";

export const Titlebar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex z-30 items-center border-b-1 border-app-sperator px-4 lg:px-12 py-3 w-full">
      <BackButton />
      <div
        className="font-bold text-app-color text-xl uppercase m-auto max-w-25 text-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        {appName}
      </div>
    </div>
  );
};
