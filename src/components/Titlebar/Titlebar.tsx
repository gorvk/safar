import { useNavigate } from "react-router-dom";
import { appName } from "../../constants";
import { Back } from "../../Icons/Back";

export const Titlebar = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (history.length <= 2) {
      navigate('/');
      return;
    }
    navigate(-1);
  }

  return (
    <div className="flex z-30 items-center border-b-1 border-app-sperator px-4 lg:px-12 py-3 w-full">
      {location.pathname !== "/" && (
        <div className="cursor-pointer" onClick={handleBack}>
          <Back />
        </div>
      )}
      <div
        className="font-bold text-app-color text-xl uppercase m-auto max-w-25 text-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        {appName}
      </div>
    </div>
  );
};
