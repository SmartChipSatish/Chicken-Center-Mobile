import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../modules/auth/components/Login";
import OTPVerfication from "../modules/accounts/components/otpLogin/OTPVerfication";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TabNav } from "./TabNavigation";
import { StackNavgation } from "./ScreensNavigations";

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
            {/* <Stack.Screen name='main' component={StackNavgation} options={{
                headerShown: false
            }} /> */}
        </Stack.Navigator>
    )
}