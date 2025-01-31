import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail";
import { Checkpoint } from "./pages/Checkpoint";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/detail/:id/:checkpointId" element={<Checkpoint />} />
    </Routes>
  );
};
