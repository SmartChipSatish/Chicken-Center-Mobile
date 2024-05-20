import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Wallet = () => {
    const navigate = useNavigation<any>()
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.blance_Text}>Blance</Text>
                <View style={styles.cash_container}>
                    <Text>0</Text>
                </View>
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={styles.buttons} onPress={() => navigate.navigate('recharge')}>
                <Text style={styles.buttonText}>Add Money To Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttons,styles.transaction_btn]} onPress={() => navigate.navigate('transactionHistory')}>
                <Text style={[styles.buttonText,{color:'red'}]}>Transaction History</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    buttons:{
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'red',
        borderRadius: 10,
        width:'90%',
        marginBottom: 10,
    },
    transaction_btn:{
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'red'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,

    },
    blance_Text: {
        fontSize: 15,
        color: 'black'
    },
    cash_container: {
        marginTop: 10,
        borderWidth: 1,
        width: '40%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
});

export default Wallet;
