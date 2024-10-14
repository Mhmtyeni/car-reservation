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

export const carBrands = createApi({
  reducerPath: "carBrands",
  baseQuery,
  tagTypes: ["Brands"],
  //get all brands api
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: ({ page, size }) => ({
        url: `/CarBrands/get-all-car-brands?Page=${page}&Size=${size}&IsActive=true&IsDeleted=false`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.carBrands.map(({ id }) => ({ type: "Brands", id })),
              { type: "Brands", id: "LIST" },
            ]
          : [{ type: "Brands", id: "LIST" }],
    }),
    //get by id brands api
    getBrand: builder.query({
      query: (carBrandId) => ({
        url: `/CarBrands/get-by-id-car-brand/${carBrandId}`,
        method: "GET",
      }),
      providesTags: (result) => [{ type: "Brands", id: result?.carBrandId }],
    }),
    //add brands api
    addBrand: builder.mutation({
      query: (brand) => ({
        url: "/CarBrands/add-car-brand",
        method: "POST",
        body: brand,
      }),
      invalidatesTags: [{ type: "Brands", id: "LIST" }],
    }),
    //update brands api
    updateBrand: builder.mutation({
      query: ({ carBrandId, carBrandName }) => ({
        url: `/CarBrands/update-car-brand`,
        method: "PUT",
        body: { carBrandId, carBrandName },
      }),
      invalidatesTags: [{ type: "Brands", id: "LIST" }],
    }),
    //delete brands api
    deleteBrand: builder.mutation({
      query: (carBrandId) => ({
        url: `/CarBrands/delete-car-brand/${carBrandId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Brands", id: arg }],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandQuery,
  useAddBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = carBrands;
