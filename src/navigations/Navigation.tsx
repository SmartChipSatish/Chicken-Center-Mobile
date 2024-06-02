import React from 'react';
import { useAuth } from '../modules/auth/components/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavgation } from './ScreensNavigations';
import { BeforeLoginScreens } from './BeforeNavigation';
import Loding from '../modules/dashboard/components/Loding';

const Navigation = () => {
    const { userToken, loading } = useAuth();
    
    return (
        <>
        {!loading &&<NavigationContainer>
            {userToken ? <StackNavgation /> : <BeforeLoginScreens />}
        </NavigationContainer>}
        {loading && <Loding/>}
        </>
    );
};

export default Navigation