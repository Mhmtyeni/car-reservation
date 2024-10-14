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

export const companies = createApi({
  reducerPath: "companies",
  baseQuery,
  tagTypes: ["Companies"],
  //get all companies api
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: ({ page, size }) => ({
        url: `/Companies/get-all-companies?Page=${page}&Size=${size}&IsActive=true&IsDeleted=false`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.companies.map(({ id }) => ({ type: "Companies", id })),
              { type: "Companies", id: "LIST" },
            ]
          : [{ type: "Companies", id: "LIST" }],
    }),
    //get by id company api
    getCompany: builder.query({
      query: (companyId) => ({
        url: `/Companies/get-by-id-company/${companyId}`,
        method: "GET",
      }),
      transformResponse: (response) => response,
    }),
    //add company api
    addCompany: builder.mutation({
      query: (companyBody) => ({
        url: "/Companies/add-company",
        method: "POST",
        body: companyBody,
      }),
      invalidatesTags: [{ type: "Companies", id: "LIST" }],
    }),
    //update company api
    updateCompany: builder.mutation({
      query: ({ companyId, companyName }) => ({
        url: "/Companies/update-company",
        method: "PUT",
        body: { companyId, companyName },
      }),
      invalidatesTags: ["Companies"],
    }),
    //delete company api
    deleteCompany: builder.mutation({
      query: (companyId) => ({
        url: `/Companies/delete-company/${companyId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Companies", id: arg }],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useGetCompanyQuery,
  useAddCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companies;
