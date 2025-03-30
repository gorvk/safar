import { createBrowserRouter, RouteObject } from "react-router-dom";
import { action } from "./components/Itinerary/ItineraryFormAction";
import {
  Home,
  View,
  Checkpoint,
  AddItinerary,
  EditItinerary,
  Layout,
  Profile,
  Error,
  About,
} from "./pages";
import { Legal } from "./pages/Legal";

const routes: RouteObject[] = [
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: ":id/profile", element: <Profile /> },
      { path: "add", element: <AddItinerary />, action: action },
      { path: ":id/edit", element: <EditItinerary />, action: action },
      { path: ":id/view", element: <View /> },
      { path: ":id/:checkpointId/view", element: <Checkpoint /> },
    ],
  },
  { path: "about", element: <About /> },
  { path: "legal", element: <Legal /> },
];

export const router = createBrowserRouter(routes);
