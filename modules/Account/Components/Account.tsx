import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import MobileNoModel from './OtpLogin/MobileNoModel';
import AfterLogin from './AfterLogin/AfterLogin';
import OtherFields from './OtherFields/OtherFields';
import { style } from '../utlis/Styles';
import { GoogleSignin } from 'react-native-google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ForwardArrowIcon, LogoutIcon } from '../../assets/svgimages/AccountsSvgs/accountsSvgs';
import auth from '@react-native-firebase/auth';
import { useGetUseDetailsMutation } from '../../Auth/services/getUserDEtails';

 export default function Account({ navigation }: any) {

    const [show, setShow] = useState<boolean>(false);
    const [details, setDetails] = useState<boolean>(false);
    const [login, setLogin] = useState<boolean>(false);
    const [getUser] =useGetUseDetailsMutation();
    const handleClose = () => {
        setShow(!show);
    }

    GoogleSignin.configure({
        webClientId: '781535826140-6kr39lp0fm05a2fupcecf42j9ka8o5v0.apps.googleusercontent.com',
    });

    const handleGoogleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
             const user = auth().currentUser;
            const idTokens = await user?.getIdToken();
            AsyncStorage.setItem('login', 'true');
            AsyncStorage.setItem('idToken', JSON.stringify(idTokens));
            const data= await getUser('');
            if (idTokens) {
                setDetails(true);
            }
        } catch (error) {
            console.log(error, 'error')
        }
    };

    // const Checkuser = async () => {
    //     const login = await AsyncStorage.getItem('login');
    //     setLogin(Boolean(login));
    // }

    const handleLogout=async()=>{
        await AsyncStorage.clear();
        navigation.navigate('login');
    }

    // useFocusEffect(
    //     useCallback(() => {
    //         Checkuser();
    //     }, [])
    // );

    return (
        <ScrollView style={{ margin: 10, }}
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}
        >
            <View>
                <View style={style.container}>
                    <Text>KMMC</Text>
                    <Text>Welcom to Chicken , Manage your oders, rewards, addresses & other details.</Text>
                   {/* <View>
                        <TouchableOpacity style={style.login_button} onPress={() => { setShow(true); }} >
                            <Text style={{ color: 'white' }}>Login / Sign Up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.login_button} onPress={() => handleGoogleLogin()} >
                            <Text style={{ color: 'white' }}>Google</Text>
                        </TouchableOpacity>
                    </View> */}
                    {/* {details && <Text>login don</Text>} */}
                </View>

                <AfterLogin />
                <OtherFields />
                <TouchableOpacity
                    style={[style.logout_container]}
                    onPress={handleLogout}
                >
                    <View style={style.login_icon}>
                        <LogoutIcon />
                        <View style={{ marginLeft: 15 }}>
                            <Text style={style.title}>Logout</Text>
                        </View>
                    </View>
                    <View style={{ marginRight: 16 }}>
                        <ForwardArrowIcon />
                    </View>
                </TouchableOpacity>
                
                <View style={[style.container, { justifyContent: 'center', alignItems: 'center', height: 80 }]}>
                    <Text>App version - 1.0.0</Text>
                </View>
            </View>
            {show && <MobileNoModel show={show} handleClose={handleClose} />}
        </ScrollView>
    )
}
