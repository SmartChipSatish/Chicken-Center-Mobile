import React from 'react';
import { useAuth } from '../modules/auth/components/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavgation } from './ScreensNavigations';
import { BeforeLoginScreens } from './BeforeNavigation';

const Navigation = () => {
    const { userToken } = useAuth();
    
    return (
        <NavigationContainer>
            {userToken ? <StackNavgation /> : <BeforeLoginScreens />}
        </NavigationContainer>
    );
};

export default Navigation