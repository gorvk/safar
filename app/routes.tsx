import { route } from "@react-router/dev/routes";

const routes = [
  route("/", "./routes/Layout.tsx", [
    route("/", "./routes/Home.tsx"),
    route("add", "./routes/AddItinerary.tsx"),
    route(":id/edit", "./routes/EditItinerary.tsx"),
    route(":id/view", "./routes/View.tsx"),
    route(":id/:checkpointId/view", "./routes/Checkpoint.tsx"),
    route(":id/profile", "./routes/Profile.tsx"),
  ]),
  route("about", "./routes/About.tsx"),
  route("legal", "./routes/Legal.tsx"),
];

export default routes;
