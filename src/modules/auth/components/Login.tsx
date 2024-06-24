import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, TextInput, Text, Alert, BackHandler, ScrollView, TouchableOpacity, Keyboard, Platform, PermissionsAndroid, ImageBackground } from 'react-native';
import { StyleSheet } from "react-native";
import { TEXT_COLORS, THEME_COLORS } from '../../../globalStyle/GlobalStyles';
import auth from '@react-native-firebase/auth';
import Contacts from 'react-native-contacts';
import { GoogleSignin } from 'react-native-google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loding from '../../dashboard/components/Loding';
import { useGetUserDetailsMutation } from '../store/services/getUserDetailsService';
import { useAuth } from './AuthProvider';
const backgroundImg = require('../../../assets/Images/login_bg.png');

export default function LoginPage() {

    const [number, setNumber] = useState<string>('');
    const [numberCheck, setNumberCheck] = useState<boolean>(false);
    const [loding, setLoding] = useState<boolean>(false);
    const navigation = useNavigation<any>();
    const [getUser] = useGetUserDetailsMutation();
    const { login } = useAuth();

    const NumberValidation = (number: string) => {
        setNumber(number);
        const numberRegx = /^[0-9]{10}$/
        if (numberRegx.test(number)) {
            setNumberCheck(true);
        } else {
            setNumberCheck(false);
        }
    }

    GoogleSignin.configure({
        webClientId: '781535826140-6kr39lp0fm05a2fupcecf42j9ka8o5v0.apps.googleusercontent.com',
    });

    const SendOtp = async () => {
        if (!numberCheck) {
            return;
        }
        if (numberCheck || number !== '') {
            Keyboard.dismiss();
            setLoding(true);
            try {
                const res = await auth().signInWithPhoneNumber('+91' + number);
                navigation.navigate('otpverfication', { number: number, data: res })
                setLoding(false);
            } catch (error) {
                setLoding(false);
                Alert.alert("Something went wrong");
            }
        } else {
            Alert.alert("Please enter a valid mobile number");
        }

    }


    const getPhoneNo = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    title: 'Contacts Permission',
                    message: 'This app would like to view your contacts.',
                    buttonPositive: 'Please accept bare mortal',
                }
            );

            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                return;
            }
        }

        Contacts.getAll()
            .then((contacts: any) => {
                NumberValidation(contacts)
            })
            .catch((e) => {
                console.log(e);
            });
    };
    useEffect(() => {
        getPhoneNo();
    }, [])

    const BackPressAlert = () => {
        Alert.alert('Exit App', 'Are you sure you want to exit', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel'
            },
            {
                text: 'Exit',
                onPress: () => BackHandler.exitApp()
            }

        ])
        return true;
    }

    const handleGoogleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            const user = auth().currentUser;
            const idTokens = await user?.getIdToken();
            AsyncStorage.setItem('idToken', JSON.stringify(idTokens));
            setLoding(true);
            try {
                const data = await getUser(`${user?.uid}`);
                const userId = data?.data?._id
                if (userId) {
                    setLoding(false);
                    login(JSON.stringify(idTokens),userId);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'main' }],
                    });
                }

            } catch (error) {
                console.log(error, 'error');
            }
        } catch (error) {
            console.log(error, 'error')
        }
    };

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', BackPressAlert);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', BackPressAlert)
            }
        }, [])
    );

    return (
        // <View style={style.container}>
        <ImageBackground source={backgroundImg}
            style={{ height: '100%',width:'100%' }}>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={style.scrollViewContent}
                keyboardShouldPersistTaps='always'>
                <View style={style.innerContainer}>
                    <View style={{ width: '100%' }}>
                        <Text style={style.header}>Login / Sign up with your Phone Number</Text>
                    </View>
                    <View
                        style={style.inputContainer}
                    >
                        <Text style={style.county_code}>+91</Text>
                        <TextInput style={style.num_input}
                            placeholder='Enter Number'
                            onChangeText={(e) => NumberValidation(e)}
                            editable={true}
                            keyboardType="numeric"
                            maxLength={10}
                            value={number}
                            placeholderTextColor={TEXT_COLORS.primary}
                        />
                    </View>
                    <View style={style.butns_container}>
                        <TouchableOpacity
                            onPress={SendOtp}
                            activeOpacity={numberCheck ? 0 : 1}
                            style={[style.numberVerificationBtn,
                            { backgroundColor: numberCheck ? `${THEME_COLORS.secondary}` : `${THEME_COLORS.light_color}` }
                            ]}
                        >
                            <Text style={{ color: 'white', fontSize: 16 }}>Proceed with OTP</Text>
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '6%', marginBottom: '6%' }}>
                            <Text style={{ fontSize: 18, color: TEXT_COLORS.secondary }}>--------- or ---------</Text>
                        </View>
                        <TouchableOpacity style={style.numberVerificationBtn} onPress={() => handleGoogleLogin()} >
                            <Text style={{ color: 'white', fontSize: 16 }}>Google</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {loding && <Loding type='login' />}
        </ImageBackground>
        // </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: '3%'
    },
    innerContainer: {
        width: '100%',
        alignItems: 'center',
    },
    header: {
        color: TEXT_COLORS.primary,
        fontSize: 18,
        // fontWeight: 'bold',

    }, input_text: {
        color: TEXT_COLORS.primary,
    },
    numberVerificationBtn: {
        marginTop: 10,
        backgroundColor: `${THEME_COLORS.secondary}`,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: '60%'
    },
    mobileNo_textInput: {
        height: 58,
        marginTop: 20,
        width: '90%',
        alignSelf: "center",
        padding: 10,
        fontSize: 20,
        color: TEXT_COLORS.primary,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '2%',
        borderBottomWidth: 1,
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: '2%',
        height: 60,
        paddingLeft: '5%',
        marginRight: '2%'
    }, butns_container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }, county_code: {
        marginRight: 10,
        color: TEXT_COLORS.primary,
        fontSize: 18
    }, num_input: {
        marginRight: '2%',
        fontSize: 18,
        color: TEXT_COLORS.primary,
    }
});