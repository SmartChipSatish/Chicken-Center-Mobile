import { userApi } from "../../store/api/userApi";

export const getUserData = userApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserDetails: builder.mutation({
            query: (id) => (
                {
                    url: `/getUserByUid?uId=${id}`,
                    method: 'GET'
                }),
            invalidatesTags: ['userList']
        })
    }),
    overrideExisting: true,
})

export const { useGetUserDetailsMutation } = getUserData