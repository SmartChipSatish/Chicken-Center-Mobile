import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const StatusButton = ({ status }:{status: string}) => {
    const getStatus = (status: string) => {
        switch (status) {
            case 'Received':
                return { label: 'PLACED', backgroundColor: '#FEEBC8', textColor: '#DD6B20' }; 
            case 'PLACED':
                return { label: 'COD', backgroundColor: '#FEEBC8', textColor: '#DD6B20' }; 
            case 'CANCELLED':
                return { label: 'CANCELLED', backgroundColor: '#FED7D7', textColor: '#E53E3E' }; 
            case 'DELIVERD':
                return { label: 'DELIVERED', backgroundColor: '#C6F6D5', textColor: '#38A169' }; 
            default:
                return { label: 'Unknown', backgroundColor: '#E2E8F0', textColor: '#2D3748' }; 
        }
    };

    const { label, backgroundColor, textColor } = getStatus(status);

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor }]}>
            <Text style={[styles.buttonText, { color: textColor }]}>{label}</Text>
        </TouchableOpacity>
    );
};

export default StatusButton;

const styles = StyleSheet.create({
    button: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    buttonText: {
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});
