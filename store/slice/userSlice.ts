import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { saveUser, logout } = userSlice.actions;

export const selectCount = (state: RootState) => state.user;

export default userSlice.reducer;
