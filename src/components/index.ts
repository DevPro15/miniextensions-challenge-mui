import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "app",
  initialState: {
    isLoggedIn: false,
    user: undefined as string | undefined,
    message: undefined as string | undefined,
    classes: undefined as Types.State["app"]["classes"],
  },
  reducers: {
    setUser(state, action: PayloadAction<string | undefined>) {
      state.user = action.payload;
    },
    setMessage(state, action: PayloadAction<string | undefined>) {
      state.message = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setClasses(state, action: PayloadAction<Types.State["app"]["classes"]>) {
      state.classes = action.payload;
    },
  },
});

export const { setClasses, setMessage, setIsLoggedIn, setUser } = slice.actions;

export const appReducer = slice.reducer;

export { StudentDetails } from "./StudentList";
export { Form, formReducer } from "./Form/Form";
