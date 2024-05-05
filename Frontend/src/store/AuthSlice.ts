import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIService from "../utils/APIServices";
import { baseUrl } from "../utils/endpoints";

export interface Hospital {
  hospital_name: string;
  address: string;
  city: string;
  state: string;
  license_number: string;
  lga: string;
  admin_email: string;
  phone: string;
  logo_url?: string;
  password: string;
}

export interface User {
  id: number;
  doctor_id?: string;
  name?: string;
  hospital_name: string;
  address: string;
  city: string;
  state: string;
  license_number: string;
  logo_url: string;
  lga: string;
  admin_email: string;
  phone: string;
  is_approved: boolean;
  hospital_id: string;
  created_at?: string;
}

export interface AuthState {
  loading: boolean;
  token: string;
  error?: boolean;
  success: boolean;
  hospitalData: Hospital;
  user: User | null; // Add user field to store the logged-in user
}

const initialState: AuthState = {
  loading: false,
  token: "",
  error: false,
  success: false,
  hospitalData: {
    hospital_name: "",
    address: "",
    city: "",
    state: "",
    license_number: "",
    lga: "",
    admin_email: "",
    phone: "",
    logo_url: "",
    password: "",
  },
  user: null, // Initialize user as null
};

interface ApiResponse<T> {
  status: number;
  data: T;
}

export const createHospital = createAsyncThunk<
  Hospital,
  Hospital,
  { rejectValue: string }
>(
  "auth/createHospital",
  async (hospitalData: Hospital, { rejectWithValue }) => {
    try {
      const response = await APIService.post<Hospital>(
        `${baseUrl}api/v1/hospital`,
        hospitalData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const hospitalLogin = createAsyncThunk<
  ApiResponse<any>,
  { url: string; formData: string },
  { rejectValue: string }
>("hospitalLogin", async ({ url, formData }, { rejectWithValue }) => {
  try {
    const response = await APIService.post<ApiResponse<any>>(url, formData);
    if (response.status === 401) {
      return rejectWithValue("Unauthorized");
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.token = action.payload.access_token;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHospital.pending, (state) => {
        state.loading = true;
      })
      .addCase(createHospital.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.hospitalData = action.payload;
      })
      .addCase(createHospital.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { resetState, loginSuccess } = authSlice.actions;
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export default authSlice.reducer;
