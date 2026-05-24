import {createAsyncThunk,createSlice,} from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

//! ================= SAFE PARSE =================
const safeParse = (value) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch (e) {
    return null;
  }
};

const storedUser = safeParse(
  localStorage.getItem("user")
);


const initialState = {
  user: storedUser,
  loading: false,
  error: null,
};

//! ================= GET PROFILE =================
export const getProfileData = createAsyncThunk("user/getProfileData",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/users/profile-data");

      console.log("PROFILE RESPONSE:", data);

      const user = data.user || data.data?.user;

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || error.response?.data?.message);
    }
  }
);

//! =================== UPDATE PROFILE

export const updateProfilePhoto = createAsyncThunk("user/updateProfilePhoto",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("photo", file);
      const { data } = await api.put("/users/upload-photo", formData);

      return data?.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message
      );
    }
  }
);
//! ================= UPLOAD PHOTO =================
export const uploadPhoto = createAsyncThunk("user/uploadPhoto",
  async (formData, thunkAPI) => {
    try {
      const { data } = await api.put("/users/upload-photo", formData);

      const user = data.user || data.data?.user;

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      toast.success("Photo Updated");

      return user;
    } catch (error) {
      toast.error(error.response?.data?.error || error.response?.data?.message);

      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.response?.data?.message
      );
    }
  }
);



//! ================= CHANGE PASSWORD =================
export const changePassword = createAsyncThunk("user/changePassword",
  async (values, thunkAPI) => {
    try {
      const { data } = await api.patch("/users/change-password", values);

      toast.success("Password Changed");
      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.error || error.response?.data?.message
      );

      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.response?.data?.message
      );
    }
  }
);

//! ================= USER SLICE =================
const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder


      .addCase(
        getProfileData.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getProfileData.fulfilled,
        (state, action) => {
          state.loading = false;
          state.user =
            action.payload;
        }
      )

      .addCase(updateProfilePhoto.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(
        getProfileData.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      )


      .addCase(
        uploadPhoto.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        uploadPhoto.fulfilled,
        (state, action) => {
          state.loading = false;
          state.user =action.payload;
        }
      )

      

      .addCase(
        uploadPhoto.rejected,
        (state, action) => {
          state.loading = false;
          state.error =action.payload;
        }
      );
  },
});

export default userSlice.reducer;