import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { selectAccessToken } from "./authSlice";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "/api",
//   prepareHeaders: (headers, { getState }) => {
//     const token = selectAccessToken(getState());
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     headers.set("accept", "application/json");
//     return headers;
//   },
// });

import fetchWithAuth from "../../middleware";
const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  prepareHeaders: async (headers) => {
    try {
      const accessToken = await fetchWithAuth();
      // Eğer token varsa Authorization header ekle
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

export const carLocations = createApi({
  reducerPath: "carLocations",
  baseQuery,
  tagTypes: ["CarLocations"],
  //get all locations api
  endpoints: (builder) => ({
    getLocations: builder.query({
      query: ({ page = 0, size = 5 }) => ({
        url: `/Locations/get-all-locations?Page=${page}&Size=${size}&IsActive=true&IsDeleted=false`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.locations.map(({ id }) => ({
                type: "CarLocations",
                id,
              })),
              { type: "CarLocations", id: "LIST" },
            ]
          : [{ type: "CarLocations", id: "LIST" }],
    }),

    //add locations api
    addLocation: builder.mutation({
      query: (locationBody) => ({
        url: "/Locations/add-location",
        method: "POST",
        body: locationBody,
      }),
      invalidatesTags: [{ type: "CarLocations", id: "LIST" }],
    }),

    //update locations api
    updateLocation: builder.mutation({
      query: ({ locationId, locationName }) => ({
        url: "/Locations/update-location",
        method: "PUT",
        body: { locationId, locationName },
      }),
      invalidatesTags: [{ type: "CarLocations", id: "LIST" }],
    }),
    //delete locations api
    deleteLocation: builder.mutation({
      query: (locationId) => ({
        url: `/Locations/delete-location/${locationId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "CarLocations", id: arg },
      ],
    }),
    //get by id locations api
    getLocation: builder.query({
      query: (locationId) => ({
        url: `/Locations/get-by-id-location/${locationId}`,
        method: "GET",
      }),
      providesTags: (result) => [
        { type: "CarLocations", id: result?.locationId },
      ],
    }),
  }),
});

export const {
  useGetLocationsQuery,
  useGetLocationQuery,
  useAddLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} = carLocations;
