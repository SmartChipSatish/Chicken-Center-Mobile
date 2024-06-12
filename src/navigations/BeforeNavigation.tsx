import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../modules/auth/components/Login";
import Ionicons from 'react-native-vector-icons/Ionicons'
import OTPVerfication from "../modules/auth/components/OTPVerfication";
import ProfileScreen from "../modules/accounts/components/afterLogin/Profile/ProfileScreen";

export const BeforeLoginScreens = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name='login' component={Login} options={{
                headerShown: false,
            }} />
            <Stack.Screen name='otpverfication' component={OTPVerfication} options={{
                headerShown: false,
                headerLeft: () => {
                    return (
                        <Ionicons name='chevron-back' size={30} color={'black'} />
                    )
                }
            }} />
            <Stack.Screen name="profile" component={ProfileScreen} options={{
                title: 'Profile',
                headerTitleAlign: 'center',

            }}
            />
        </Stack.Navigator>
    )
}