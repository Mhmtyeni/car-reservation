import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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

export const carReservationApprovals = createApi({
  reducerPath: "carReservationApprovals",
  baseQuery,
  tagTypes: ["CarReservationApprovals"],

  endpoints: (builder) => ({
    //get all Car Reservation Approvals api
    getCarReservationApprovals: builder.query({
      query: ({ page, size }) => ({
        url: `/CarReservationApprovals/get-all-car-reservation-approval?Page=${page}&Size=${size}&IsActive=true&IsDeleted=false`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.carReservationApprovals.map(({ id }) => ({
                type: "CarReservationApprovals",
                id,
              })),
              { type: "CarReservationApprovals", id: "LIST" },
            ]
          : [{ type: "CarReservationApprovals", id: "LIST" }],
    }),
    //update Car Reservation Approvals api
    updateCarReservationApprovals: builder.mutation({
      query: (approvalsBody) => ({
        url: "/CarReservationApprovals/update-car-reservation-approval",
        method: "PUT",
        body: approvalsBody,
      }),
      invalidatesTags: [{ type: "CarReservationApprovals", id: "LIST" }],
    }),
    getUserReservationApprovals: builder.query({
      query: ({ page, size, appUserId, reservationStatusId }) => ({
        url: `/CarReservationApprovals/get-by-user-id-car-reservation-approval?UserId=${appUserId}&ReservationStatusId=${reservationStatusId}&Page=${page}&Size=${size}&IsActive=true&IsDeleted=false`,
        method: "GET",
      }),
      invalidatesTags: [{ type: "CarReservationApprovals", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCarReservationApprovalsQuery,
  useUpdateCarReservationApprovalsMutation,
  useGetUserReservationApprovalsQuery,
} = carReservationApprovals;
