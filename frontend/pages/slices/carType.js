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

export const carType = createApi({
  reducerPath: "carType",
  baseQuery,
  tagTypes: ["TypeFilter"],
  //get all car types api
  endpoints: (builder) => ({
    getCarTypes: builder.query({
      query: ({ page = 0, size = 5 }) => ({
        url: `/CarTypes/get-all-car-types?Page=${page}&Size=${size}&IsActive=true&IsDeleted=false`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.carTypes.map(({ id }) => ({ type: "TypeFilter", id })),
              { type: "TypeFilter", id: "LIST" },
            ]
          : [{ type: "TypeFilter", id: "LIST" }],
    }),
    //get by id car type api
    getCarType: builder.query({
      query: (carTypeId) => ({
        url: `/CarTypes/get-by-id-car-type/${carTypeId}`,
        method: "GET",
      }),
      transformResponse: (response) => response,
    }),
    //add car type api
    addCarType: builder.mutation({
      query: (typeCar) => ({
        url: "/CarTypes/add-car-type",
        method: "POST",
        body: typeCar,
      }),
      invalidatesTags: [{ type: "TypeFilter", id: "LIST" }],
    }),
    //update car type api
    updateCarType: builder.mutation({
      query: ({ carTypeId, carTypeName }) => ({
        url: "/CarTypes/update-car-type",
        method: "PUT",
        body: { carTypeId, carTypeName },
      }),
      invalidatesTags: ["TypeFilter"],
    }),
    //delete car type api
    deleteCarType: builder.mutation({
      query: (carTypeId) => ({
        url: `/CarTypes/delete-car-type/${carTypeId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "TypeFilter", id: arg },
      ],
    }),
  }),
});

export const {
  useGetCarTypesQuery,
  useGetCarTypeQuery,
  useAddCarTypeMutation,
  useUpdateCarTypeMutation,
  useDeleteCarTypeMutation,
} = carType;
