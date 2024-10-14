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
export const carReservationDetails = createApi({
  reducerPath: ["carReservationDetails"],
  baseQuery,
  tagTypes: ["CarReservation"],
  endpoints: (builder) => ({
    addCarReservation: builder.mutation({
      query: (carReservation) => ({
        url: "/CarReservation/add-car-reservation",
        method: "POST",
        body: carReservation,
      }),
    }),
  }),
});

export const { useAddCarReservationMutation } = carReservationDetails;
