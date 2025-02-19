import { useNavigate } from "react-router-dom";
import { Add } from "../../Icons/Add";

export const AddItineraryButton = () => {
  const navigate = useNavigate();
  return (
    <div className="cursor-pointer" onClick={() => navigate("/add")}>
      <Add />
    </div>
  );
};
