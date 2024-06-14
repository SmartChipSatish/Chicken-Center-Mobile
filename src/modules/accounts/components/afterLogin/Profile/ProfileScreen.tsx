import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import { style } from '../../../utlis/Styles';
import { TEXT_COLORS, THEME_COLORS } from '../../../../../globalStyle/GlobalStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetUserByUserIdMutation, useUpdateUserMutation } from '../../../../auth/store/services/getUserDetailsService';
import Loding from '../../../../dashboard/components/Loding';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { setUser } from '../../../store/slices/UserSlice';
import { ShowToster } from '../../../../../sharedFolders/components/ShowToster';
import { useToast } from 'react-native-toast-notifications';

const ProfileScreen: React.FC = () => {
    const user = useSelector((store: RootState) => store.user.user);

    const [updateUser] = useUpdateUserMutation();
    const navigation = useNavigation<any>();
    const dispatch = useDispatch()

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [mobileNumber, setMobileNumber] = useState<string>('');
    const [avatarUri, setAvatarUri] = useState<string | null>(null);
    const [canUpdateEmail, setCanUpdateEmail] = useState<boolean>(false);
    const [canUpdatePhone, setCanUpdatePhone] = useState<boolean>(false);
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [loding, setLoding] = useState<boolean>(false);
    const [avatarError, setAvatarError] = useState<string | null>(null);
    const toast = useToast();
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
        setIsEdited(true);
    };

    const handleEmailChange = (email: string) => {
        if (validateEmail(email)) {
            setEmailError(null);
        } else {
            setEmailError('Invalid email format');
        }
        setEmail(email);
        setIsEdited(true);
    };

    const handlePhoneChange = (number: string) => {
        if (validatePhoneNumber(number)) {
            setPhoneError(null);
        } else {
            setPhoneError('Phone number should be 10 digits');
        }
        setMobileNumber(number);
        setIsEdited(true);
    };
    const formatMobileNumber = (mobileNumber: string) => {
        if (mobileNumber.startsWith('+91')) {
            return mobileNumber.slice(3);
        } else if (mobileNumber.startsWith('91') && mobileNumber.length === 12) {
            return mobileNumber.slice(2);
        } else {
            return mobileNumber;
        }
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
                    email: email,
                    profileUrl: avatarUri
                }).unwrap();
                setLoding(false);
                dispatch(setUser(response.data));

                if (response) {
                    navigation.navigate('home');
                }
            }
        } catch (error) {
            console.log(error);
            setLoding(false);
        }
    };

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
                    setAvatarError(null);
                    setIsEdited(true);
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
                setAvatarError(null);
                AsyncStorage.setItem('login', 'true');
            }).catch(err => {
                // Alert.alert("An Error Occured While Uploading");
                ShowToster(toast, 'An Error Occured While Uploading', '', 'error');
                setAvatarError("Failed to upload image");
            });
    };

    useEffect(() => {
        if (user) {
            setEmail(user?.email);
            setName(user?.name);
            const formattedNumber = user ? formatMobileNumber(user?.primaryNumber?.toString()) : '';
            setMobileNumber(formattedNumber);
            setCanUpdateEmail(user?.primaryNumber ? true : false);
            setCanUpdatePhone(user?.email ? true : false);
            setAvatarUri(user?.profileUrl);
        }
    }, [user]);

    useEffect(() => {
        const isFormValid = (!nameError && !emailError && !phoneError && !avatarError) && (name !== user?.name || email !== user?.email || mobileNumber !== user?.primaryNumber?.toString() || avatarUri !== user?.profileUrl);
        setIsFormValid(isFormValid);
    }, [nameError, emailError, phoneError, avatarError, name, mobileNumber, email, avatarUri, user]);

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
                {avatarError && <Text style={styles.errorText}>{avatarError}</Text>}
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.side_header}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={(e) => { handleNameChange(e) }}
                />
                {nameError && <Text style={styles.errorText}>{nameError}</Text>}
                <Text style={styles.side_header}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(e) => { handleEmailChange(e) }}
                    keyboardType="email-address"
                    editable={canUpdateEmail}
                />
                {emailError && <Text style={styles.errorText}>{emailError}</Text>}
                <Text style={styles.side_header}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChangeText={(e) => { handlePhoneChange(e) }}
                    maxLength={10}
                    editable={canUpdatePhone}
                    keyboardType="phone-pad"
                />
                {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: isFormValid ? THEME_COLORS.secondary : THEME_COLORS.light_color }]}
                    onPress={handleSubmit}
                    disabled={!isFormValid}
                >
                    <Text style={styles.buttonText}>Update Profile</Text>
                </TouchableOpacity>
            </ScrollView>
            {loding && <Loding />}
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
    side_header: {
        color: TEXT_COLORS.primary,
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 16,
        color: TEXT_COLORS.primary,
    },
    button: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    buttonEnabled: {
        backgroundColor: THEME_COLORS.primary,
    },
    buttonDisabled: {
        backgroundColor: THEME_COLORS.light_color,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        textAlign: 'left',
        marginLeft: 16,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
});

export default ProfileScreen;
