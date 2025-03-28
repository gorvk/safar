import { createBrowserRouter, RouteObject } from "react-router-dom";
import { action } from "./components/Itinerary/ItineraryFormAction";
import {
  Home,
  AddItinerary,
  Error,
} from "./pages";
import { Legal } from "./pages/Legal";
import View, { clientLoader as viewPageLoader } from "./pages/View";
import EditItinerary, {clientLoader as editPageLoader} from "./pages/EditItinerary";
import Profile, {clientLoader as profilePageLoader} from "./pages/Profile";
import Checkpoint, {clientLoader as checkpointPageLoader} from "./pages/Checkpoint";
import Layout, {clientLoader as layoutLoader} from "./pages/Layout";
import { About } from "./pages/About";

const routes: RouteObject[] = [
  {
    element: <Layout />,
    errorElement: <Error />,
    loader: layoutLoader,
    children: [
      { path: "/", element: <Home /> },
      { path: "add", element: <AddItinerary />, action: action },
      { path: ":id/edit", element: <EditItinerary />, action: action, loader: editPageLoader },
      { path: ":id/view", element: <View />, loader: viewPageLoader },
      { path: ":id/:checkpointId/view", element: <Checkpoint />, loader: checkpointPageLoader },
      { path: ":id/profile", element: <Profile />, loader: profilePageLoader },
    ],
  },
  { path: "about", element: <About /> },
  { path: "legal", element: <Legal /> },
];

export const router = createBrowserRouter(routes);
