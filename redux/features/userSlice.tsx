import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/endpoint";

export type UserState = {
  user_data: {
    access_token: string;
    token_type: string;
  } | null;
  pending: boolean;
  error: boolean;
};

const initialState: UserState = {
  user_data: null,
  pending: false,
  error: false,
};

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async ({ formData }: { formData: {} }) => {
    const response = await axios.post(BASE_URL + "/login", formData);
    return response.data;
  }
);

export const userRegister = createAsyncThunk(
  "user/userRegister",
  async ({ formData }: { formData: {} }) => {
    const response = await axios.post(BASE_URL + "/register", formData);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user_data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(userLogin.pending, (state) => {
        state.pending = true;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.user_data = payload.data;
      })
      .addCase(userLogin.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      // register
      .addCase(userRegister.pending, (state) => {
        state.pending = true;
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.user_data = payload.data;
      })
      .addCase(userRegister.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const { logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
