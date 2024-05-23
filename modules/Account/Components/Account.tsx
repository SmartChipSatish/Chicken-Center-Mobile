import React, { useRef, useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Text } from 'react-native-paper'
import MobileNoModel from './OtpLogin/MobileNoModel';
import AfterLogin from './AfterLogin/AfterLogin';
import OtherFields from './OtherFields/OtherFields';
import { style } from '../utlis/Styles';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from 'react-native-google-signin';

// const auths = getAuth();
export default function Account({ navigation }: any) {

    const [show, setShow] = useState<boolean>(false);
    const [details,setDetails]=useState<boolean>(false)
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
        navigation.navigate('profile')
        }catch(error){
            console.log(error,'error')
        }
    };

    return (
        <ScrollView style={{ margin: 10,}}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        >
            <View>
            <View style={style.container}>
                <Text>Welcom to Chicken , Manage your oders, rewards, addresses & other details.</Text>
                <TouchableOpacity style={style.login_button} onPress={() => {setShow(true);}} >
                    <Text style={{ color: 'white' }}>Login / Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.login_button} onPress={() => handleGoogleLogin()} >
                    <Text style={{ color: 'white' }}>Google</Text>
                </TouchableOpacity>
                {details && <Text>login don</Text>}
            </View>
            
            <AfterLogin />
            <OtherFields/>
            <View style={[style.container,{justifyContent:'center',alignItems:'center',height:80}]}>
              <Text>App version - 1.0.0</Text>
            </View>
            </View>
            {show && <MobileNoModel show={show} handleClose={handleClose}/>}
        </ScrollView>
    )
}
