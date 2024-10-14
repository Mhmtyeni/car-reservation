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

export const carModel = createApi({
  reducerPath: "carModel",
  baseQuery,
  tagTypes: ["Model"],
  endpoints: (builder) => ({
    //get all model api
    getCarModels: builder.query({
      query: ({ page, size }) => ({
        url: `/CarModels/get-all-car-models?Page=${page}&Size=${size}&IsActive=true&IsDeleted=false`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.carModels.map(({ id }) => ({
                type: "Model",
                id,
              })),
              { type: "Model", id: "LIST" },
            ]
          : [{ type: "Model", id: "LIST" }],
    }),
    //get by id model api
    getCarModel: builder.query({
      query: (carModelId) => ({
        url: `/CarModels/get-by-id-car-model/${carModelId}`,
        method: "GET",
      }),
      transformResponse: (response) => response,
    }),
    //get model by brand id api
    getModelbyBrand: builder.query({
      query: (carBrandId) => ({
        url: `/CarModels/get-all-car-model-by-brand-id/${carBrandId}`,
        method: "GET",
      }),
      invalidatesTags: [{ type: "Model", id: "LIST" }],
    }),
    //add model api
    addCarModel: builder.mutation({
      query: (carModelBody) => ({
        url: "/CarModels/add-car-model",
        method: "POST",
        body: carModelBody,
      }),
      invalidatesTags: [{ type: "Model", id: "LIST" }],
    }),
    //update model api
    updateCarModel: builder.mutation({
      query: (carModelUpdateBody) => ({
        url: "/CarModels/update-car-model",
        method: "PUT",
        body: carModelUpdateBody,
      }),
      invalidatesTags: ["Model"],
    }),
    //delete model api
    deleteCarModel: builder.mutation({
      query: (carModelId) => ({
        url: `/CarModels/delete-car-model/${carModelId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Model", id: arg }],
    }),
  }),
});

export const {
  useGetCarModelsQuery,
  useGetCarModelQuery,
  useGetModelbyBrandQuery,
  useAddCarModelMutation,
  useUpdateCarModelMutation,
  useDeleteCarModelMutation,
} = carModel;
