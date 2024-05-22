import React from 'react';
import { View, Button, Linking, Alert, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import ContactUsICon from '../../../../assets/svgimages/AccountsSvgs/contactUsICon';
import { THEME_COLORS } from '../../../../GlobalStyles/GlobalStyles';


const ContactUs = () => {

    const phoneNumber = '1234567890';
    const makeCall = () => {
        Linking.openURL(`tel:${phoneNumber}`)
      };

    const sendEmail = () => {
      Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description')
    };

    return (
        <View style={style.container}>
            <ContactUsICon />
            <Text>That's a urge to get in touch with us!</Text>
            <TouchableOpacity style={style.contact} onPress={makeCall}>
                <Text style={style.text}>Call Us Maybe</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={sendEmail} style={style.contact}>
                <Text style={style.text}>Drop Us a Line</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ContactUs;

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contact: {
        width: '90%',
        height: 40,
        backgroundColor: `${THEME_COLORS.secondary}`,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 15,
        color: 'white',
    }
})
