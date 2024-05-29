import React, { useState } from 'react'
import { Alert, Linking, ScrollView, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import MobileNoModel from './OtpLogin/MobileNoModel';
import AfterLogin from './AfterLogin/AfterLogin';
import OtherFields from './OtherFields/OtherFields';
import { style } from '../utlis/Styles';
import { GoogleSignin } from 'react-native-google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ForwardArrowIcon, LogoutIcon } from '../../assets/svgimages/AccountsSvgs/accountsSvgs';
import { Image } from 'react-native';
const appLogo = require('../../assets/Images/app-logo.png');

 export default function Account({ navigation }: any) {

    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => {
        setShow(!show);
    }

    GoogleSignin.configure({
        webClientId: '781535826140-6kr39lp0fm05a2fupcecf42j9ka8o5v0.apps.googleusercontent.com',
    });

    const handleLogout=async()=>{
        await AsyncStorage.clear();
        navigation.navigate('login');
    }

    const handlePress = async () => {
        const url = 'http://smartchiptechno.com';
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
        }
      };

    return (
        <ScrollView style={{ margin: 10, }}
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}
        >
            <View>
                <View style={[style.container,style.account]}>
                <Image source={appLogo}
                       style={style.logo} 
                       resizeMode="contain" />
                   <View style={{marginLeft:'3%'}}>
                    <Text style={style.main_title}>KMMC</Text>
                    <Text>Manage your Account</Text>
                    </View>
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
                <Text style={style.footer_Text}>Designed & Developed by: <Text style={{fontWeight:'bold'}} onPress={handlePress}>SmartChip Technology</Text></Text>
                <Text>App version - 1.0.0</Text>
                </View>
            </View>
            {show && <MobileNoModel show={show} handleClose={handleClose} />}
        </ScrollView>
    )
}
