import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";


const CustomToast = ({ message, sideColor, title }: any) => {
    return (
        <View style={[styles.toastContainer, { borderLeftColor: sideColor, borderLeftWidth: 15 }]}>
            <Text style={[styles.toastText, { color: '#4C4B4B' }]}>{message}</Text>
            {title !== '' && <Text style={[styles.toastText, { color: '#4C4B4B' }]}>{title}</Text>}
        </View>
    );
};

export default CustomToast

const styles = StyleSheet.create({
    toastContainer: {
        borderRadius: 5,
        width: '90%',
        backgroundColor: '#FCF7F7',
        height: 50,
        justifyContent: 'center',
    },
    toastText: {
        fontSize: 16,
        marginLeft: '2%'
    },
    success: {
        backgroundColor: 'green',
    },
    error: {
        backgroundColor: 'red',
    },
    warning: {
        backgroundColor: 'orange',
    },
});
