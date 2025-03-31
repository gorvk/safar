import { useLocation, useNavigate } from "react-router";
import { Back } from "../../Icons/Back";

export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation()

  const handleBack = () => {
    if (history.length <= 2) {
      navigate("/");
      return;
    }
    navigate(-1);
  };

  if (location.pathname === "/" || location.pathname === "/about") {
    return <></>;
  }
  return (
    <div className="absolute cursor-pointer" onClick={handleBack}>
      <Back />
    </div>
  );
};
