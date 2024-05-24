import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import { style } from '../../../utlis/Styles';
import axios from 'axios';
import { TEXT_COLORS } from '../../../../GlobalStyles/GlobalStyles';

const ProfileScreen: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('Talakanti');
    const [lastName, setLastName] = useState<string>('Saiprakash');
    const [email, setEmail] = useState<string>('talakantisaiprakash@gmail.com');
    const [mobileNumber, setMobileNumber] = useState<string>('901542135');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [avatarUri, setAvatarUri] = useState<string | null>(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

    const handleChoosePhoto = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
            quality: 1 as const,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                console.log(response, 'sai')
                const uri = response.assets[0].uri;
                const type = response.assets[0].type;
                const name = response.assets[0].fileName;
                const source1 = {
                    uri,
                    type,
                    name,
                }
                uploadImage(source1)
                const source = response.assets[0].uri;
                if (source) {
                    setAvatarUri(source);
                }
            }
        });
    };


    const uploadImage = (photo: any) => {
        const data = new FormData()
        console.log(data, 'data')
        data.append('file', photo)
        data.append('upload_preset', 'cgvymfjn')
        data.append("cloud_name", "dnhbdmhp6")
        fetch("https://api.cloudinary.com/v1_1/dnhbdmhp6/image/upload", {
            method: "POST",
            body: data
        }).then(res => res.json()).
            then(data => {
                setAvatarUri(data.secure_url)

            }).catch(err => {
                Alert.alert("An Error Occured While Uploading")
            })
    }
    console.log(avatarUri)
    return (
        <ScrollView contentContainerStyle={styles.container}>
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
            <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>

            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
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
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
            />

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
            </View>

            <TouchableOpacity style={style.login_button}>
                <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        marginVertical: 20,
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
        color: `${TEXT_COLORS.primary}`
    },
    button: {
        width: '100%',
        padding: 16,
        backgroundColor: '#d32f2f',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
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
