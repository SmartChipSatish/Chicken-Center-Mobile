import { userApi } from "./userApi";

export const getUserData = userApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserDetails: builder.mutation({
            query: (id) => (
                {
                    url: `/users/getUserByUid?uId=${id}`,
                    method: 'GET'
                }),
            invalidatesTags: ['userList']
        }),
        getUserByUserId: builder.mutation({
            query: (userId) => (
                {
                    url: `/users/getUserById?userId=${userId}`,
                    method: 'GET'
                }),
            invalidatesTags: ['userList']
        }),
        updateUser: builder.mutation({
            query: ({ userId, ...rest }) => (
                {
                    url: `/users/updateUser?userId=${userId}`,
                    method: 'POST',
                    body: rest
                }),
            invalidatesTags: ['userList']
        })
    }),
    overrideExisting: true,
})

export const { useGetUserDetailsMutation, useGetUserByUserIdMutation, useUpdateUserMutation } = getUserData