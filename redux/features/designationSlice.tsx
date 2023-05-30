import { BASE_URL } from "@/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { DesignationsType } from "@/app/(dashboard)/designations/page";

export type DesignationState = {
  designations: DesignationsType[] | null;
  pending: boolean;
  error: boolean;
};

const initialState: DesignationState = {
  designations: null,
  pending: false,
  error: false,
};

export const getDesignations = createAsyncThunk(
  "user/getDesignations",
  async ({ token, page }: { token: string; page?: number }) => {
    const response = await axios.get(`${BASE_URL}/designations`, {
      params: { page: page },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  }
);

export const createDesignation = createAsyncThunk(
  "designation/createDesignation",
  async ({ token, formData }: { token: string; formData: {} }) => {
    const response = await axios.post(`${BASE_URL}/designations`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  }
);

interface UpdateArgs {
  token: string;
  formData: {};
  id: string | number;
}

export const editDesignation = createAsyncThunk(
  "designation/editDesignation",
  async ({ token, id, formData }: UpdateArgs) => {
    const response = await axios.put(
      `${BASE_URL}/designations/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data;
  }
);

export const deleteDesignation = createAsyncThunk(
  "designation/deleteDesignation",
  async ({ token, id }: { token: string; id: string | number }) => {
    const response = await axios.delete(`${BASE_URL}/designations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  }
);

export const designationSlice = createSlice({
  name: "designation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // designations
      .addCase(getDesignations.pending, (state) => {
        state.pending = true;
      })
      .addCase(getDesignations.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.designations = payload.data.data;
      })
      .addCase(getDesignations.rejected, (state) => {
        state.pending = false;
        state.designations = null;
        state.error = true;
      });
  },
});

export const selectDesignation = (state: RootState) => state.designations;

export default designationSlice.reducer;
