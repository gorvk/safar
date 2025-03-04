import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Home } from "./pages/Home";
import { View } from "./pages/View";
import { Checkpoint } from "./pages/Checkpoint";
import { AddItinerary } from "./pages/AddItinerary";
import { EditItinerary } from "./pages/EditItinerary";
import { action } from "./components/Itinerary/ItineraryFormAction";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "add", element: <AddItinerary />, action: action },
  { path: ":id/edit", element: <EditItinerary />, action: action },
  { path: ":id/view", element: <View /> },
  { path: ":id/:checkpointId/view", element: <Checkpoint /> },
];

export const router = createBrowserRouter(routes);
