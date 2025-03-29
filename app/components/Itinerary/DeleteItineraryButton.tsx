import { useNavigate } from "react-router";
import { deleteItinerarySF } from "../../svc/itineraryForm";
import { useState } from "react";
import { store } from "../../redux/store";
import loader from "../../redux/slices/loader";

export const DeleteItineraryButton = (props: { id: string | undefined }) => {
  const navigate = useNavigate();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const { id } = props;

  const openConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const deleteItinerary = async () => {
    if (id) {
      store.dispatch(loader.actions.setloader(true));
      const ok = await deleteItinerarySF(id);
      if (ok) {
        navigate("/");
      }
      store.dispatch(loader.actions.setloader(false));
    }
  };

  if (isConfirmationOpen) {
    return (
      <div className="flex gap-3 flex-col md:flex-row md:items-center">
        <div>Are you sure you want to delete this post ?</div>
        <div className="flex gap-3 items-center">
          <button
            onClick={closeConfirmation}
            className="bg-app-color h-7 py-1 text-sm min-w-15 outline-none rounded-lg font-bold text-white uppercase cursor-pointer"
          >
            No
          </button>
          <button
            onClick={deleteItinerary}
            className="bg-app-color h-7 py-1 text-sm min-w-15 outline-none rounded-lg font-bold text-white uppercase cursor-pointer"
          >
            Yes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={openConfirmation}
        className="bg-app-color py-1 text-sm min-w-28 rounded-lg font-bold text-white uppercase cursor-pointer"
      >
        Delete Post
      </button>
    </div>
  );
};
