import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "./userApi";

const userRoleSlice = createSlice({
  name: "userRolesSlice",
  initialState: {
    roles: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setRoles(state, action) {
      state.roles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApi.endpoints.getUsers.matchFulfilled,
        (state, action) => {
          // API yanıtını 'userRoles'ile eşleştir
          if (action.payload?.userApi) {
            state.roles = action.payload.userApi;
          } else {
            state.roles = [];
          }
          state.status = "succeeded";
        }
      )
      .addMatcher(userApi.endpoints.getUsers.matchPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(userApi.endpoints.getUsers.matchRejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setRoles } = userRoleSlice.actions;
export const selectUserRoles = (state) => state.userApi.roles || [];

export default userRoleSlice.reducer;
