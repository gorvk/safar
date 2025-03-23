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
} from "./pages";

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: ":id/profile", element: <Profile /> },
      { path: "add", element: <AddItinerary />, action: action },
      { path: ":id/edit", element: <EditItinerary />, action: action },
      { path: ":id/view", element: <View /> },
      { path: ":id/:checkpointId/view", element: <Checkpoint /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
