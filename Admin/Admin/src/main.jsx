import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <App /> // No need to wrap in BrowserRouter here; it's already in App.jsx
);
