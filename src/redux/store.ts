import { configureStore } from "@reduxjs/toolkit";

import { appReducer, formReducer } from "../components";

export const store = configureStore({
  reducer: {
    app: appReducer,
    form: formReducer,
  },
});
