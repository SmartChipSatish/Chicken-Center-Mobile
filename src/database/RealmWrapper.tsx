import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useApp } from '@realm/react';
import { OpenRealmBehaviorType } from 'realm';
import { RealmContext } from './schemas/cartItemsShema';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavgation } from '../navigations/ScreensNavigations';
import { BeforeLoginScreens } from '../navigations/BeforeNavigation';
import MainApp from '../../App';
const { RealmProvider } = RealmContext

export default function RealmWrapper() {
    const app = useApp();
    const [login, setLogin] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(() => {
        const login = async () => {
            const creditials = Realm.Credentials.anonymous();
            await app.logIn(creditials);
            setLogin(true);
        }
        login();
    }, [])

    const Checkuser = async () => {
        const login = await AsyncStorage.getItem('login');
        setLoginStatus(Boolean(login));
    }
    useEffect(() => {
        Checkuser();
    }, [])

    return (
        <>
            {login ? <RealmProvider
                sync={{
                    flexible: true,
                    newRealmFileBehavior: {
                        type: OpenRealmBehaviorType.DownloadBeforeOpen
                    },
                    existingRealmFileBehavior: {
                        type: OpenRealmBehaviorType.OpenImmediately
                    }
                }}
            >
                <MainApp/>
            </RealmProvider> : <ActivityIndicator size={'large'} />}
        </>
    )
}