import { useNavigate } from "react-router-dom";
import { Back } from "../../Icons/Back";

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (history.length <= 2) {
      navigate("/");
      return;
    }
    navigate(-1);
  };

  if (location.pathname === "/") {
    return <></>;
  }
  return (
    <div className="absolute cursor-pointer" onClick={handleBack}>
      <Back />
    </div>
  );
};
