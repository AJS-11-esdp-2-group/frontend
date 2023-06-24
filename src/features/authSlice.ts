/* eslint-disable no-empty-pattern */
import { IUser } from "../interfaces/IUser";
import authApi from "../Store/services/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  user: IUser | null;
}
const initialState: State = {
  user: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.signIn.matchFulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.user = action.payload;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
      });
  }
});

export const {} = authSlice.actions;

export default authSlice.reducer;
