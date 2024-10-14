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

export const carsDetails = createApi({
  reducerPath: "carsDetails",
  baseQuery,
  tagTypes: ["CarsData"],
  endpoints: (builder) => ({
    //all car api
    getCars: builder.query({
      query: ({ page = 0, size = 10 }) => ({
        url: `/Cars/get-all-cars?Page=${page}&Size=${size}&IsActive=false&IsDeleted=true`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.cars.map(({ id }) => ({ type: "CarsData", id })),
              { type: "CarsData", id: "LIST" },
            ]
          : [{ type: "CarsData", id: "LIST" }],
    }),
    //get available cars api
    getAvailableCars: builder.query({
      query: ({
        startDate,
        endDate,
        locationId,
        carTypeId,
        page = 0,
        size = 10,
      }) => ({
        url: `/Cars/get-all-available-cars?LocationId=${locationId}&CarTypeId=${carTypeId}&StartDateTime=${startDate}&EndDateTime=${endDate}&Page=${page}&Size=${size}&IsActive=true&IsDeleted=false`,
        method: "GET",
      }),
    }),

    //add car api
    addCar: builder.mutation({
      query: (carBody) => ({
        url: "/Cars/add-car",
        method: "POST",
        body: carBody,
      }),
      invalidatesTags: [{ type: "CarsData", id: "LIST" }],
    }),
    //pasive car api ---> ıspasive=true
    getPassiveCar: builder.query({
      query: ({ IsPassive, page, size }) => ({
        url: `/Cars/get-all-car-by-passive-or-active?IsPassive=${IsPassive}&Page=${page}&Size=${size}&IsActive=true&IsDeleted=false`,
        method: "GET",
      }),
      transformResponse: (response) => response,
    }),
    //update pasive car api
    putPassiveCar: builder.mutation({
      query: ({ carId, IsPassive }) => ({
        url: `/Cars/change-car-passive?CarId=${carId}&IsPassive=${IsPassive}`,
        method: "PUT",
      }),
    }),
    //update car api
    putCar: builder.mutation({
      query: (carBody) => ({
        url: "/Cars/update-car",
        method: "PUT",
        body: carBody,
      }),
      invalidatesTags: [{ type: "CarsData", id: "LIST" }],
    }),
    //add car file api
    addCarFile: builder.mutation({
      query: ({ carId, fileDescription }) => ({
        url: `/Cars/upload-file-car?CarId=${carId}&FileDescription=${fileDescription}`,
        method: "POST",
      }),
    }),
    //delete car api---> isactive=false
    deleteCar: builder.mutation({
      query: (carId) => ({
        url: `/Cars/delete-car/${carId}`,
        method: "DELETE",
      }),
    }),
    //delete car file api
    deleteCarFile: builder.mutation({
      query: (ImageId) => ({
        url: `/Cars/delete-file-car/${ImageId}`,
        method: "DELETE",
      }),
    }),
    //unavailable admin table car api
    getUnavilableCar: builder.query({
      query: ({ carTypeId, page = 0, size = 50 }) => ({
        url: `/Cars/get-all-unavailable-car-without-location?CarTypeId=${carTypeId}&Page=${page}&Size=${size}&IsActive=true&IsDeleted=false`,
        method: "GET",
      }),
    }),
    //available admin table car api
    getAvilableCar: builder.query({
      query: ({ carTypeId, page = 0, size = 50 }) => ({
        url: `/Cars/get-all-available-car-without-location?CarTypeId=${carTypeId}&Page=${page}&Size=${size}&IsActive=true&IsDeleted=false`,
        method: "GET",
      }),
    }),
    //get by id car api
    getCar: builder.query({
      query: (carId) => ({
        url: `/Cars/get-by-id-car/${carId}`,
        method: "GET",
      }),
      providesTags: (result) => [{ type: "CarsData", id: result?.id }],
    }),
  }),
});

export const {
  useGetCarsQuery,
  useGetAvailableCarsQuery,
  useGetCarQuery,
  useAddCarMutation,
  useGetPassiveCarQuery,
  usePutPassiveCarMutation,
  usePutCarMutation,
  useAddCarFileMutation,
  useDeleteCarMutation,
  useDeleteCarFileMutation,
  useGetUnavilableCarQuery,
  useGetAvilableCarQuery,
} = carsDetails;
