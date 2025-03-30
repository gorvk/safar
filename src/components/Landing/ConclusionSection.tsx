import { useNavigate } from "react-router-dom";

export const ConclusionSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="relative p-1 lg:rounded-xl shadow-md border-1 border-app-seperator">
        <img
          src="landing/form.png"
          className="lg:min-w-full lg:max-w-full lg:max-h-200 lg:min-h-200"
        />
      </div>
      <div className="mt-10 text-3xl font-medium m-auto text-app-secondary-color text-center bottom-0 left-0 right-0 mx-2">
        Create your Itineraries & share with the world !
      </div>
      <div
        onClick={() => navigate('/')}
        className="cursor-pointer text-xl font-bold m-auto text-app-color shadow-md text-center bottom-0 w-fit p-2 px-4 rounded-md bg-white border-1 animate-custom-bounce border-app-seperator left-0 right-0 mx-auto"
      >
        Try now
      </div>
    </>
  );
};
