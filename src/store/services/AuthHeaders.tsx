import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const Headers=(url :string)=>{
  return fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: async (headers: any) => {
        const token = await AsyncStorage.getItem('idToken');
        if (token) {
            headers.set('authorization', `${token}`)
        }

        return headers
    },
  })
}