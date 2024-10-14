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
export const reservationStatuses = createApi({
  reducerPath: "reservationStatuses",
  baseQuery,
  tagTypes: ["ReservationStatuses"],
  //get all Reservation Statuses api
  endpoints: (builder) => ({
    getReservationStatuses: builder.query({
      query: ({ page = 0, size = 5 }) => ({
        url: `/ReservationStatuses/get-all-reservation-statuses?Page=${page}&Size=${size}&IsActive=true&IsDeleted=false`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.reservationStatues.map(({ id }) => ({
                type: "ReservationStatuses",
                id,
              })),
              { type: "ReservationStatuses", id: "LIST" },
            ]
          : [{ type: "ReservationStatuses", id: "LIST" }],
    }),
    //get by id Reservation Statuses api
    getReservationStatus: builder.query({
      query: (statusId) => ({
        url: `/ReservationStatuses/get-by-id-reservation-status/${statusId}`,
        method: "GET",
      }),
      transformResponse: (response) => response,
    }),
    //add Reservation Statuses api
    addReservationStatus: builder.mutation({
      query: (statusBody) => ({
        url: "/ReservationStatuses/add-reservation-status",
        method: "POST",
        body: statusBody,
      }),
      invalidatesTags: [{ type: "ReservationStatuses", id: "LIST" }],
    }),
    //update Reservation Statuses api
    updateReservationStatus: builder.mutation({
      query: ({ statusId, statusName }) => ({
        url: "/ReservationStatuses/update-reservation-status",
        method: "PUT",
        body: { statusId, statusName },
      }),
      invalidatesTags: ["ReservationStatuses"],
    }),
    //delete Reservation Statuses api
    deleteReservationStatus: builder.mutation({
      query: (statusId) => ({
        url: `/ReservationStatuses/delete-reservation-status/${statusId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ReservationStatuses", id: arg },
      ],
    }),
  }),
});

export const {
  useGetReservationStatusesQuery,
  useGetReservationStatusQuery,
  useAddReservationStatusMutation,
  useUpdateReservationStatusMutation,
  useDeleteReservationStatusMutation,
} = reservationStatuses;
