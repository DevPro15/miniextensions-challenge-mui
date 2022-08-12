import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

import App from "App";
import { store } from "redux/store";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
