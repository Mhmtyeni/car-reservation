import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import fetchWithAuth from "../../middleware";
const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  prepareHeaders: async (headers) => {
    try {
      const accessToken = await fetchWithAuth();
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      headers.set("accept", "application/json");
      return headers;
    } catch (error) {
      console.error("Token alma hatası:", error);
      return headers; // Hata durumunda da headers'ı geri döndür
    }
  },
});

export const userRoles = createApi({
  reducerPath: "userRoles",
  baseQuery,
  tagTypes: ["Roles"],
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: ({ page = 0, size = 5 }) => ({
        url: `/Roles/get-all-roles?Page=${page}&Size=${size}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.datas.map(({ id }) => ({ type: "Roles", id })),
              { type: "Roles", id: "LIST" },
            ]
          : [{ type: "Roles", id: "LIST" }],
    }),
    getRole: builder.query({
      query: (roleId) => ({
        url: `/Roles/get-by-id-role/${roleId}`,
        method: "GET",
      }),
    }),
    addRoles: builder.mutation({
      query: (role) => ({
        url: "/Roles/add-role",
        method: "POST",
        body: role,
      }),
      invalidatesTags: [{ type: "Roles", id: "LIST" }],
    }),
    putRoles: builder.mutation({
      query: ({ roleId, roleName }) => ({
        url: "/Roles/update-role",
        method: "PUT",
        body: { roleId, roleName },
      }),
      invalidatesTags: [{ type: "Roles", id: "LIST" }],
    }),
    deleteRoles: builder.mutation({
      query: (roleId) => ({
        url: `/Roles/delete-role${roleId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Roles", id: "LIST" }],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRoleQuery,
  useAddRolesMutation,
  usePutRolesMutation,
  useDeleteRolesMutation,
} = userRoles;
