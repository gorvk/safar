import { route, RouteConfig } from "@react-router/dev/routes";
import { createBrowserRouter } from "react-router";

export const routes: RouteConfig = [
  route("/", "./pages/Layout.tsx", [
    route("/", "./pages/Home.tsx"),
    route("add", "./pages/AddItinerary.tsx"),
    route(":id/edit", "./pages/EditItinerary.tsx"),
    route(":id/view", "./pages/View.tsx"),
    route(":id/:checkpointId/view", "./pages/Checkpoint.tsx"),
    route(":id/profile", "./pages/Profile.tsx"),
  ]),
];
export const router = createBrowserRouter(routes);
