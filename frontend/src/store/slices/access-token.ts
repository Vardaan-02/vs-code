import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AccessTokenState {
  token: string;
}

const initialState: AccessTokenState = {
  token: "",
};

export const accessTokenSlice = createSlice({
  name: "access-token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = "";
    },
  },
});

export const { setToken, removeToken } = accessTokenSlice.actions;

export default accessTokenSlice.reducer;
