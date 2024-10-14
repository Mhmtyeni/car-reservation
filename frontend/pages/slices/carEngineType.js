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

export const carEngineType = createApi({
  reducerPath: "carEngineType",
  baseQuery,
  tagTypes: ["EngineType"],
  endpoints: (builder) => ({
    //get all engine type api
    getEngineTypes: builder.query({
      query: ({ page = 0, size = 50 }) => ({
        url: `/CarEngineTypes/get-all-car-engine-types?Page=${page}&Size=${size}&IsActive=true&IsDeleted=false`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.carEngineTypes.map(({ id }) => ({
                type: "EngineType",
                id,
              })),
              { type: "EngineType", id: "LIST" },
            ]
          : [{ type: "EngineType", id: "LIST" }],
    }),
    //get by id engine type api
    getEngineType: builder.query({
      query: (carEngineTypeId) => ({
        url: `/CarEngineTypes/get-by-id-car-engine-type/${carEngineTypeId}`,
        method: "GET",
      }),
      providesTags: (result) => [
        { type: "EngineType", id: result?.carEngineTypeId },
      ],
    }),
    //add engine type api
    addEngineType: builder.mutation({
      query: (engineType) => ({
        url: "/CarEngineTypes/add-car-engine-type",
        method: "POST",
        body: engineType,
      }),
      invalidatesTags: [{ type: "EngineType", id: "LIST" }],
    }),
    //update engine type api
    updateEngineType: builder.mutation({
      query: ({ carEngineTypeId, carEngineTypeName }) => ({
        url: "/CarEngineTypes/update-car-engine-type",
        method: "PUT",
        body: { carEngineTypeId, carEngineTypeName },
      }),
      invalidatesTags: ["EngineType"],
    }),
    //delete engine type api
    deleteEngineType: builder.mutation({
      query: (carEngineTypeId) => ({
        url: `/CarEngineTypes/delete-car-engine-type/${carEngineTypeId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "EngineType", id: arg },
      ],
    }),
  }),
});

export const {
  useGetEngineTypesQuery,
  useGetEngineTypeQuery,
  useAddEngineTypeMutation,
  useUpdateEngineTypeMutation,
  useDeleteEngineTypeMutation,
} = carEngineType;
