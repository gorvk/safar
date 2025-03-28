import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
  Navigate,
} from "react-router-dom";

export const Error = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold">Opps something went wrong !!!</h1>
      <button
        className="bg-app-color text-white py-2 px-4 rounded-md font-bold mt-4"
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>
    </div>
  );
};
