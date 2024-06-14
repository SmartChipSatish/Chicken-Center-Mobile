import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavgation } from './ScreensNavigations';
import { BeforeLoginScreens } from './BeforeNavigation';
import { useAuth } from '../modules/auth/components/AuthProvider';
import LottieView from "lottie-react-native";
import { ToastProvider } from 'react-native-toast-notifications';
import CustomToast from '../sharedFolders/components/CustomToast';

const splashScreen = require('./splash_screen.json')

const Navigation = () => {
    const { userToken, loading } = useAuth();

    return (
        <>
            {!loading && <ToastProvider
                renderType={{
                    custom_type: (toast) => (
                        <CustomToast
                            message={toast.message}
                            title={toast.data?.title}
                            type={toast.data?.type}
                            color={toast.data?.color}
                            sideColor={toast.data?.sideColor}
                        />
                    )
                }}
            >
                <NavigationContainer>
                    {userToken ? <StackNavgation /> : <BeforeLoginScreens />}
                </NavigationContainer>
            </ToastProvider>}
            {loading && <LottieView
                source={splashScreen}
                style={{ width: "100%", height: "100%", backgroundColor: 'black' }}
                autoPlay
                loop
            />}
        </>
    );
};

export default Navigation

