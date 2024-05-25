import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, TextInput, Text, Alert, BackHandler, ScrollView, TouchableOpacity, Keyboard, Platform, PermissionsAndroid } from 'react-native';
import { StyleSheet } from "react-native";
import { TEXT_COLORS, THEME_COLORS } from '../../GlobalStyles/GlobalStyles';
import auth from '@react-native-firebase/auth';
import Contacts from 'react-native-contacts';
import { GoogleSignin } from 'react-native-google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetUseDetailsMutation } from '../../Account/api/services/getUserDEtails';
import Loding from '../../Dashboard/components/Loding';

export default function LoginPage() {

    const [number, setNumber] = useState<string>('');
    const [numberCheck, setNumberCheck] = useState<boolean>(false);
    const [loding, setLoding] = useState<boolean>(false);
    const navigation = useNavigation<any>();
    const [focuse, setFocuse] = useState(true);
    const [getUser] = useGetUseDetailsMutation();
    // let textInptRef = useRef(null);
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

    const handleOnchangeFocus = () => {
        setFocuse(true);
    }

    const onChangeBlure = () => {
        setFocuse(false)
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
                //   setPermissionDenied(true);
                return;
            }
        }

        Contacts.getAll()
            .then((contacts: any) => {
                console.log(contacts, 'number')
                //   setContacts(contacts);
                NumberValidation(contacts)
            })
            .catch((e) => {
                console.log(e);
                //   setPermissionDenied(true);
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
            console.log(user,'userss')
            AsyncStorage.setItem('login', 'true');
            AsyncStorage.setItem('idToken', JSON.stringify(idTokens));
            setLoding(true);
            try{
                console.log('detaolssss');
                const data = await getUser(`${user?.uid}`);
                console.log(data,'details');
                if(data){
                    setLoding(false);
                    navigation.navigate('main');
                }

            }catch(error){
              console.log(error,'error');
            }
            // if (idTokens) {
            //     setDetails(true);
            // }
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
        <View>
        <ScrollView showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='always'
            style={{ backgroundColor: THEME_COLORS.primary }}>
            <View style={style.modalContainer}>
                <View style={style.modalContent}>
                    <View style={{ marginTop: 10 }}>
                        <Text style={style.header}>Login / Sign up with your Phone Number</Text>
                    </View>
                    <View style={style.inputContainer}>
                        <View style={{ marginLeft: 5, justifyContent: 'center' }}>
                            <Text style={[style.input_text, { fontSize: 20, }]}>+91</Text>
                        </View>
                        <View style={{ width: '70%', marginBottom: 20 }}
                        >

                            <TextInput style={style.mobileNo_textInput}
                                //    ref={(input)=> textInptRef =input}
                                placeholder='Enter Number'
                                onChangeText={(e) => NumberValidation(e)}
                                keyboardType="phone-pad"
                                maxLength={10}
                                autoFocus={true}
                                value={number}
                                onFocus={handleOnchangeFocus}
                                onBlur={onChangeBlure}
                                placeholderTextColor={TEXT_COLORS.secondary}
                            />

                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={SendOtp}
                        activeOpacity={numberCheck ? 0 : 1}
                        style={[style.numberVerificationBtn,
                        { backgroundColor: numberCheck ? `${THEME_COLORS.secondary}` : `${THEME_COLORS.light_color}` }
                        ]}
                    >
                        <Text style={{ color: 'white' }}>Proceed with OTP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.numberVerificationBtn} onPress={() => handleGoogleLogin()} >
                        <Text style={{ color: 'white' }}>Google</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        {loding && <Loding/>}
        </View>
    );
}

const style = StyleSheet.create({
    modalContainer: {
        // flex: 1,
        // justifyContent: 'flex-end',
        // backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center'
    }, header: {
        color: TEXT_COLORS.primary,
        fontSize: 18,
        fontWeight: 'bold'
    }, input_text: {
        color: TEXT_COLORS.primary,
    },
    modalContent: {
        backgroundColor: THEME_COLORS.primary,
        padding: 30,
    },
    numberVerificationBtn: {
        marginTop: 10,
        backgroundColor: `${THEME_COLORS.secondary}`,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    mobileNo_textInput: {
        //    borderBottomWidt
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
        borderBottomWidth: 1,
        height: 58,
        width: '100%',
        alignItems: 'center',
        marginVertical: 32
    }
});