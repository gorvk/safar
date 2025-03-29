import { useNavigate } from "react-router-dom";
import { BackButton } from "./BackButton";

export const Titlebar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex z-30 items-center border-b-1 border-app-seperator px-4 lg:px-12 py-3 w-full">
      <BackButton />
      <div
        className="m-auto cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/title.svg" className="max-w-none w-35 m-auto" />
      </div>
    </div>
  );
};
