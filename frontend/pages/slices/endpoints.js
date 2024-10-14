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

export const endpoints = createApi({
  reducerPath: "endpoints",
  baseQuery,
  endpoints: (builder) => ({
    getEndpoint: builder.query({
      query: () => ({
        url: "/ApplicationServices/get-all-endpoints",
        method: "GET",
      }),
    }),
    getRolesToEndpoint: builder.query({
      query: ({ code, menu }) => ({
        url: "/AuthorizationEndpoints/GetRolesToEndpoint",
        method: "POST",
        body: {
          code,
          menu,
        },
      }),
    }),
    getAssignRoleEndpoint: builder.mutation({
      query: ({ roles, code, menu }) => ({
        url: "/AuthorizationEndpoints/AssignRoleEndpoint",
        method: "POST",
        body: {
          roles,
          code,
          menu,
        },
      }),
    }),
  }),
});

export const {
  useGetEndpointQuery,
  useGetRolesToEndpointQuery,
  useGetAssignRoleEndpointMutation,
} = endpoints;

//name + code
//role adı
