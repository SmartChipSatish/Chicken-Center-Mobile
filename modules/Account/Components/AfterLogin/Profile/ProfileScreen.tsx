import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import { style } from '../../../utlis/Styles';
import { TEXT_COLORS } from '../../../../GlobalStyles/GlobalStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetUserDetailsMutation } from '../../../../Auth/services/getUserDetailsService';

const ProfileScreen: React.FC = () => {
    const [getUser] = useGetUserDetailsMutation();

    const [name, setName] = useState<string>('user');
    const [email, setEmail] = useState<string>('user@gmail.com');
    const [mobileNumber, setMobileNumber] = useState<number>(9999999999);
    const [avatarUri, setAvatarUri] = useState<string | null>(null);
    // const [password, setPassword] = useState<string>('');
    // const [confirmPassword, setConfirmPassword] = useState<string>('');
    // const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    // const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);
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
                const uid = await AsyncStorage.getItem('uid');
                const response = await getUser(uid).unwrap();
                setEmail(response?.email);
                setName(response?.name);
                setMobileNumber(response?.primaryNumber);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

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
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mobile Number"
                    value={mobileNumber.toString()}
                    onChangeText={(number) => setMobileNumber(Number(number))}
                    keyboardType="phone-pad"
                />
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
            <TouchableOpacity style={style.login_button}>
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
});

export default ProfileScreen;
