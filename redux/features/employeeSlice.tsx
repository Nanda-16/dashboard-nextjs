import { BASE_URL } from "@/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { EmployeeType } from "@/app/(dashboard)/employees/page";

export type Employeestate = {
  employees: EmployeeType[] | null;
  pending: boolean;
  error: boolean;
};

const initialState: Employeestate = {
  employees: null,
  pending: false,
  error: false,
};

export const getEmployees = createAsyncThunk(
  "user/getEmployees",
  async ({ token, page }: { token: string; page?: number }) => {
    const response = await axios.get(`${BASE_URL}/employees`, {
      params: {
        page: page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  }
);

export const createEmployee = createAsyncThunk(
  "designation/createEmployee",
  async ({ token, formData }: { token: string; formData: {} }) => {
    const response = await axios.post(`${BASE_URL}/employees`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  }
);

interface EmployeesUpdateArgs {
  token: string;
  formData: {};
  id: string | number;
}

export const editEmployee = createAsyncThunk(
  "designation/editEmployee",
  async ({ token, id, formData }: EmployeesUpdateArgs) => {
    const response = await axios.put(`${BASE_URL}/employees/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "designation/deleteEmployee",
  async ({ token, id }: { token: string; id: string | number }) => {
    const response = await axios.delete(`${BASE_URL}/employees/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  }
);

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // employees
      .addCase(getEmployees.pending, (state) => {
        state.pending = true;
      })
      .addCase(getEmployees.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.employees = payload.data.data;
      })
      .addCase(getEmployees.rejected, (state) => {
        state.pending = false;
        state.employees = null;
        state.error = true;
      });
  },
});

export const selectEmployee = (state: RootState) => state.employees;

export default employeeSlice.reducer;
