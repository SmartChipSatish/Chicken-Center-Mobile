import { userApi } from "../../store/api/userApi";

export const getUserData = userApi.injectEndpoints({
        endpoints: (builder) => ({
        getUserDetails:builder.mutation({
            query: (id) =>( 
                {
                url:`/getUser?uId=${id}`,
                method:'GET'
            }),
            
        })
  })
})

export const {  useGetUserDetailsMutation } = getUserData