import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import { style } from '../../../utlis/Styles';
import { TEXT_COLORS } from '../../../../GlobalStyles/GlobalStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetUserByUserIdMutation, useUpdateUserMutation } from '../../../../Auth/services/getUserDetailsService';
import Loding from '../../../../Dashboard/components/Loding';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen: React.FC = () => {
    const [getUser] = useGetUserByUserIdMutation();
    const [updateUser] = useUpdateUserMutation();
    const navigation = useNavigation<any>();

    const [name, setName] = useState<string>('user');
    const [email, setEmail] = useState<string>('user@gmail.com');
    const [mobileNumber, setMobileNumber] = useState<string>('9999999999');
    const [avatarUri, setAvatarUri] = useState<string | null>(null);
    // const [password, setPassword] = useState<string>('');
    // const [confirmPassword, setConfirmPassword] = useState<string>('');
    // const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    // const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);
    const [canUpdateEmail, setCanUpdateEmail] = useState<boolean>(false);
    const [canUpdatePhone, setCanUpdatePhone] = useState<boolean>(false);
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [loding, setLoding] = useState<boolean>(false);

    const validateName = (name: string) => {
        return name.length >= 3;
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (number: string) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(number);
    };
    const handleNameChange = (name: string) => {
        if (validateName(name)) {
            setNameError(null);
        } else {
            setNameError('Name should be at least 3 characters long');
        }
        setName(name);
    };

    const handleEmailChange = (email: string) => {
        if (validateEmail(email)) {
            setEmailError(null);
        } else {
            setEmailError('Invalid email format');
        }
        setEmail(email);
    };

    const handlePhoneChange = (number: string) => {
        if (validatePhoneNumber(number)) {
            setPhoneError(null);
        } else {
            setPhoneError('Phone number should be 10 digits');
        }
        setMobileNumber(number);
    };
    const handleSubmit = async () => {
        setLoding(true);

        try {
            const storeduserId = await AsyncStorage.getItem('userId');


            if (storeduserId) {
                const userId = storeduserId.replace(/['"]/g, '').trim();
                const response = await updateUser({
                    userId: userId,
                    name: name,
                    primaryNumber: mobileNumber,
                    email: email
                }).unwrap();
                setLoding(false);
                if (response) {
                    navigation.navigate('home');

                }
            }
        } catch (error) {
            console.log(error)
            setLoding(false);

        }


    }
    const handleChoosePhoto = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
            quality: 1 as const,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
            } else if (response.errorCode) {
            } else if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri;
                const type = response.assets[0].type;
                const name = response.assets[0].fileName;
                const source1 = {
                    uri,
                    type,
                    name,
                };
                uploadImage(source1);
                const source = response.assets[0].uri;
                if (source) {
                    setAvatarUri(source);
                }
            }
        });
    };

    const uploadImage = (photo: any) => {
        const data = new FormData();
        data.append('file', photo);
        data.append('upload_preset', 'cgvymfjn');
        data.append("cloud_name", "dnhbdmhp6");
        fetch("https://api.cloudinary.com/v1_1/dnhbdmhp6/image/upload", {
            method: "POST",
            body: data
        }).then(res => res.json())
            .then(data => {
                setAvatarUri(data.secure_url);
            }).catch(err => {
                Alert.alert("An Error Occured While Uploading");
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storeduserId = await AsyncStorage.getItem('userId');


                if (storeduserId) {
                    const userId = storeduserId.replace(/['"]/g, '').trim();
                    const response = await getUser(userId).unwrap();
                    console.log(response.primaryNumber, "phone,", response?.email)
                    setEmail(response?.email);
                    setName(response?.name);
                    setMobileNumber(response?.primaryNumber?.toString());
                    setCanUpdateEmail(response?.primaryNumber ? true : false);
                    setCanUpdatePhone(response?.email ? true : false);
                } else {
                    console.log('UID not found in AsyncStorage');
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const isFormValid = (!nameError && !emailError) || (!nameError && !phoneError);
        setIsFormValid(isFormValid);
    }, [nameError, emailError, phoneError, name, email, mobileNumber]);
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.avatarContainer}>
                    <Avatar
                        rounded
                        size="xlarge"
                        source={avatarUri ? { uri: avatarUri } : { uri: 'https://res.cloudinary.com/dz209s6jk/image/upload/v1663222594/Avatars/rmxkvbdtrp5v0rcosrev.png' }}
                        icon={{ name: 'user', type: 'font-awesome' }}
                        containerStyle={styles.avatar}
                    />
                    <TouchableOpacity style={styles.editIcon} onPress={handleChoosePhoto}>
                        <Icon name="edit" type="font-awesome" color="#fff" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.name}>{name}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={(e) => { handleNameChange(e) }}
                />
                {nameError && <Text style={styles.errorText}>{nameError}</Text>}

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(e) => { handleEmailChange(e) }}
                    keyboardType="email-address"
                    readOnly={canUpdateEmail ? false : true}
                />
                {emailError && <Text style={styles.errorText}>{emailError}</Text>}

                <TextInput
                    style={styles.input}
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    maxLength={10}
                    onChangeText={(e) => { handlePhoneChange(e) }}
                    readOnly={canUpdatePhone ? false : true}
                    keyboardType="phone-pad"
                />
                {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}

                {/* 
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity
                        style={styles.showIcon}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                        <Icon name={isPasswordVisible ? "eye" : "eye-slash"} type="font-awesome" />
                    </TouchableOpacity>
                </View>

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!isConfirmPasswordVisible}
                    />
                    <TouchableOpacity
                        style={styles.showIcon}
                        onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                    >
                        <Icon name={isConfirmPasswordVisible ? "eye" : "eye-slash"} type="font-awesome" />
                    </TouchableOpacity>
                </View> */}

            </ScrollView>
            {loding && <Loding />}

            <TouchableOpacity style={style.login_button} onPress={handleSubmit} disabled={!isFormValid}>
                <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 16,
    },
    avatarContainer: {
        position: 'relative',
        marginVertical: 20,
    },
    avatar: {
        marginBottom: 20,
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        backgroundColor: '#000',
        borderRadius: 20,
        padding: 6,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 16,
        color: `${TEXT_COLORS.primary}`,
    },
    button: {
        width: '100%',
        padding: 16,
        backgroundColor: '#d32f2f',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
        position: 'absolute',
        bottom: 0,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    showIcon: {
        position: 'absolute',
        right: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 4,
        textAlign: 'left'
    },
});

export default ProfileScreen;
