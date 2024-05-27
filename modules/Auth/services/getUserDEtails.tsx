
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react'

export const getUserData = createApi({
    reducerPath: 'getuserdata',

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://food-delivery-ekjr.onrender.com/users',
        prepareHeaders: async (headers: any) => {
            const token = await AsyncStorage.getItem('idToken');
            console.log(token,'checkkkk');
            if (token) {
                headers.set('authorization', `${token}`)
            }

            return headers
        },
    }

    ),

    endpoints: (builder) => ({
        getUseDetails:builder.mutation({
            query: (id) =>( 
                {
                url:`/getUser?uId=${id}`,
                method:'GET'
            }),
            
        })
    }),
    
})

export const {  useGetUseDetailsMutation } = getUserData