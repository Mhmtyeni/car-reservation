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

export const carCaseType = createApi({
  reducerPath: "carCaseType",
  baseQuery,
  tagTypes: ["CarCase"],
  endpoints: (builder) => ({
    //Get all car case type api
    getCarCaseTypes: builder.query({
      query: ({ page, size }) => ({
        url: `/CarCaseType/get-all-car-case-types?Page=${page}&Size=${size}&IsActive=true&IsDeleted=false`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.carCaseTypes.map(({ id }) => ({ type: "CarCase", id })),
              { type: "CarCase", id: "LIST" },
            ]
          : [{ type: "CarCase", id: "LIST" }],
    }),
    //Get car case type api
    getCarCaseType: builder.query({
      query: (carCaseTypeId) => ({
        url: `/CarCaseType/get-by-id-car-case-type/${carCaseTypeId}`,
        method: "GET",
      }),
      providesTags: (result) => [
        { type: "CarCase", id: result?.carCaseTypeId },
      ],
    }),
    // Add car case type api
    addCarCaseType: builder.mutation({
      query: (carCase) => ({
        url: "/CarCaseType/add-car-case-type",
        method: "POST",
        body: carCase,
      }),
      invalidatesTags: [{ type: "CarCase", id: "LIST" }],
    }),
    //Update car case type api
    putCarCaseType: builder.mutation({
      query: ({ carCaseTypeId, carCaseTypeName }) => ({
        url: "/CarCaseType/update-car-case-type",
        method: "PUT",
        body: { carCaseTypeId, carCaseTypeName },
      }),
      invalidatesTags: [{ type: "CarCase", id: "LIST" }],
    }),
    //Delete car case type api
    deleteCarCaseType: builder.mutation({
      query: (carCaseTypeId) => ({
        url: `/CarCaseType/delete-car-case-type/${carCaseTypeId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "CarCase", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCarCaseTypesQuery,
  useGetCarCaseTypeQuery,
  useAddCarCaseTypeMutation,
  usePutCarCaseTypeMutation,
  useDeleteCarCaseTypeMutation,
} = carCaseType;
