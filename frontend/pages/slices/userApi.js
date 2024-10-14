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

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page = 0, size = 5 }) => ({
        url: `/Users/get-all-users?Page=${page}&Size=${size}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({ type: "User", id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    getUserUserName: builder.query({
      query: (userName) => ({
        url: `/Users/get-by-user-name/${userName}`,
        method: "GET",
      }),
    }),
    getUserUserRoles: builder.query({
      query: (userId) => ({
        url: `/Users/get-roles-to-user/${userId}`,
        method: "GET",
      }),
    }),
    getUserCheckName: builder.query({
      query: (userName) => ({
        url: `/Users/check-user-name-exists/${userName}`,
        method: "GET",
      }),
    }),
    addUser: builder.mutation({
      query: (userBody) => ({
        url: "/Users/create-user",
        method: "POST",
        body: userBody,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    addAssignUserRoles: builder.mutation({
      query: ({ userId, roles }) => ({
        url: "/Users/assign-role-to-user",
        method: "POST",
        body: { userId, roles },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    addUserUploadFile: builder.mutation({
      query: ({ userId, fileDescription, files }) => {
        const formData = new FormData();
        formData.append("FileDescription", fileDescription);
        formData.append("UserId", userId);
        files.forEach((file, index) =>
          formData.append(`images[${index}]`, file)
        );

        return {
          url: `/Users/upload-file-user?UserId=${userId}&FileDescription=${fileDescription}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    deleteUserFile: builder.mutation({
      query: (imageId) => ({
        url: `/Users/delete-file-user/${imageId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    getUser: builder.query({
      query: (userId) => ({
        url: `/Users/get-by-id-user/${userId}`,
        method: "GET",
      }),
      providesTags: (result) => [{ type: "User", id: result?.userId }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetUserUserNameQuery,
  useGetUserUserRolesQuery,
  useGetUserCheckNameQuery,
  useAddUserMutation,
  useAddAssignUserRolesMutation,
  useAddUserUploadFileMutation,
  useDeleteUserFileMutation,
} = userApi;
