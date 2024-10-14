import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://10.108.206.9:83/api";

// Kullanıcı verilerini almak için
export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ token, userName }, thunkAPI) => {
    try {
      const response = await fetch(
        //   `${API_URL}/Users/get-all-users?Page=0&Size=50`,
        `${API_URL}/Users/get-by-user-name/${userName}`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Kullanıcı verileri alınamadı.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const findUserByUsername = createAsyncThunk(
  "user/findUserByUsername",
  async (username, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const users = state.user.users;
      const foundUser = users.find((user) => user.userName === username);
      if (!foundUser) {
        throw new Error("Kullanıcı bulunamadı.");
      }
      return foundUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authUserSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    foundUser: null,
    isLoading: false,
    error: null,
    userRoles: [], // Roller burada saklanacak
  },
  reducers: {
    clearFoundUser: (state) => {
      state.foundUser = null;
    },
    setUserRoles: (state, action) => {
      state.userRoles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = [action.payload];
        state.userRoles = action.payload.userRoles || []; // roller, API'den dönerse
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(findUserByUsername.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(findUserByUsername.fulfilled, (state, action) => {
        state.isLoading = false;
        state.foundUser = action.payload;
      })
      .addCase(findUserByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFoundUser, setUserRoles } = authUserSlice.actions;

export const selectUserRoles = (state) => state.user.userRoles; // Roller seçici

export default authUserSlice.reducer;
