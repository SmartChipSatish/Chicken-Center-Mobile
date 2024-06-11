import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavgation } from './ScreensNavigations';
import { BeforeLoginScreens } from './BeforeNavigation';
import { useAuth } from '../modules/auth/components/AuthProvider';
import LottieView from "lottie-react-native";
const splashScreen= require ('./splash_screen.json')

const Navigation = () => {
    const { userToken, loading } = useAuth();

    return (
        <>
            {!loading && <NavigationContainer>
                {userToken ? <StackNavgation /> : <BeforeLoginScreens />}
            </NavigationContainer>}
            {loading && <LottieView
                source={splashScreen}
                style={{ width: "100%", height: "100%",backgroundColor:'black' }}
                autoPlay
                loop
            />}
        </>
    );
};

export default Navigation