import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "form",
  initialState: { value: "" },
  reducers: {
    setValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const { setValue } = slice.actions;

export default slice.reducer;
