import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./firebase"

createRoot(document.getElementById("root")!).render(<App />);
