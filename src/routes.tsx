import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail";
import { Checkpoint } from "./pages/Checkpoint";
import { AddItinerary } from "./pages/AddItinerary";
import { EditItinerary } from "./pages/EditItinerary";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/detail/:id/:checkpointId" element={<Checkpoint />} />
      <Route path="/add" element={<AddItinerary />} />
      <Route path="/edit/:id" element={<EditItinerary />} />
    </Routes>
  );
};
