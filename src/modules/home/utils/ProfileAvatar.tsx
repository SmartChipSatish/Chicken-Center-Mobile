import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface ProfileNameInterface {
    name: string;
    imgUrl?: string;
    width?: number;
    height?: number;
    profileView?: boolean;
    onPress?: () => void;
}

function stringToColor(name: string): string {
    let hash = 0;
    let i;

    for (i = 0; i < name?.length; i += 1) {
        hash = name?.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

function ProfileAvatar(props: ProfileNameInterface) {
    const { name, imgUrl, width = 50, height = 50, profileView, onPress } = props;

    const checkName = name && name?.split(' ');
    let displayName;
    if (checkName?.length > 1) {
        displayName = checkName[0]?.slice(0, 1) + checkName[1]?.slice(0, 1);
    } else {
        displayName = name && name?.slice(0, 2);
    }

    const [checkUrl, setCheckUrl] = useState<boolean>(false);

    function stringAvatar(name: string) {
        const names = name && name?.split(' ');
        let abbreviation = '';

        if (names?.length === 1) {
            abbreviation = names[0][0];
        } else if (names?.length > 1) {
            abbreviation = `${names[0][0]}${names[1][0]}`;
        }

        return {
            color: stringToColor(name),
            children: abbreviation,
        };
    }

    const handleOnError = () => {
        setCheckUrl(false);
    };

    const isValidUrl = (url: string) => {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(url);
    };

    useEffect(() => {
        if (imgUrl) {
            try {
                setCheckUrl(isValidUrl(imgUrl));
            } catch (error) {
                setCheckUrl(false);
            }
        }
    }, [imgUrl, name]);

    const { color, children } = stringAvatar(name);

    return (
        <TouchableOpacity onPress={onPress}>

            <View style={styles.profileAvatar}>
                {checkUrl ? (
                    <View style={profileView ? styles.profileViewStyle : styles.avatarStyle}>
                        <Image
                            source={{ uri: imgUrl }}
                            style={[styles.image, { width, height }]}
                            onError={handleOnError}
                        />
                    </View>
                ) : (
                    <View style={profileView ? styles.profileViewStyle : styles.avatarStyle}>
                        <View
                            style={[
                                styles.avatar,
                                {
                                    backgroundColor: color,
                                    width,
                                    height,
                                },
                            ]}
                        >
                            <Text style={styles.avatarText}>{displayName}</Text>
                        </View>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    profileAvatar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarStyle: {
        width: 50, // default width
        height: 50, // default height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileViewStyle: {
        width: 100,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: 'white',
        fontSize: 24,
        textTransform: 'uppercase',
    },
    image: {
        borderRadius: 50,
    },
});

export default ProfileAvatar;
