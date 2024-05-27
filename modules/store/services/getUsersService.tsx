import { userApi } from "../api/userApi"

export const getAllUsers = userApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => '/getAllUsers',
            providesTags: ['userList'],
        }),

        getAllUserById: builder.query({
            query: ({ id }) => `/getUser?userId=${id}`,
            providesTags: ['userList'],
        }),
        updateUser: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/updateTodo?userId=${id}`,
                method: 'PUT',
                body: rest
            }),
            invalidatesTags: ['userList'],

        }),

    }),
    overrideExisting: true,
})

export const { useGetAllUsersQuery, useLazyGetAllUserByIdQuery } = getAllUsers