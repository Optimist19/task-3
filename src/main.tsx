import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const metaTags = [
  {
    name: "VITE_SUMMARIZER_TOKEN",
    value: import.meta.env.VITE_SUMMARIZER_TOKEN
  },
  {
    name: "VITE_TRANSLATOR_TOKEN",
    value: import.meta.env.VITE_TRANSLATOR_TOKEN
  },
  { name: "VITE_DETECTOR_TOKEN", value: import.meta.env.VITE_DETECTOR_TOKEN }
];

metaTags.forEach(({ name, value }) => {
  console.log(name);
  if (value) {
    const meta = document.createElement("meta");
    meta.httpEquiv = "origin-trial";
    meta.content = value;
    document.head.append(meta);
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
