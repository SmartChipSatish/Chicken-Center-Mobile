import React, { useEffect, useRef, useState } from 'react'
import {  ScrollView, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import MobileNoModel from './OtpLogin/MobileNoModel';
import AfterLogin from './AfterLogin/AfterLogin';
import OtherFields from './OtherFields/OtherFields';
import { style } from '../utlis/Styles';
import { GoogleSignin } from 'react-native-google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const auths = getAuth();
export default function Account({ navigation }: any) {

    const [show, setShow] = useState<boolean>(false);
    const [details,setDetails]=useState<boolean>(false);
    const [login,setLogin]=useState<boolean>(false);
    const handleClose=()=>{
        setShow(!show);
    }

    GoogleSignin.configure({
        webClientId: '781535826140-6kr39lp0fm05a2fupcecf42j9ka8o5v0.apps.googleusercontent.com',
      });

    const handleGoogleLogin = async () => {
        try {
        await GoogleSignin.hasPlayServices();
        const userInfo= await GoogleSignin.signIn();
        console.log(userInfo,'userinfo');
        if(userInfo){
            setDetails(true);
        }
        }catch(error){
            console.log(error,'error')
        }
    };
    const Checkuser=async()=>{
        const login=await AsyncStorage.getItem('login');
        console.log(login,'login')
        setLogin(Boolean(login));
    }
    useEffect(()=>{
        Checkuser();
    },[])

    return (
        <ScrollView style={{ margin: 10,}}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        >
            <View>
           <View style={style.container}>
                <Text>KMMC</Text>
                <Text>Welcom to Chicken , Manage your oders, rewards, addresses & other details.</Text>
                {!login &&<View>
                <TouchableOpacity style={style.login_button} onPress={() => {setShow(true);}} >
                    <Text style={{ color: 'white' }}>Login / Sign Up</Text>
                </TouchableOpacity>

                 <TouchableOpacity style={style.login_button} onPress={() => handleGoogleLogin()} >
                    <Text style={{ color: 'white' }}>Google</Text>
                </TouchableOpacity>
                </View>}
                {details && <Text>login don</Text>}
            </View>
            
           {login && <AfterLogin />}
            <OtherFields/>
            <View style={[style.container,{justifyContent:'center',alignItems:'center',height:80}]}>
              <Text>App version - 1.0.0</Text>
            </View>
            </View>
            {show && <MobileNoModel show={show} handleClose={handleClose}/>}
        </ScrollView>
    )
}
