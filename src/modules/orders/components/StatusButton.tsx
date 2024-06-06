import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const StatusButton = ({ status }:{status: string}) => {
    const getStatus = (status: string) => {
        switch (status) {
            case 'PLACED':
                return { label: 'PLACED', backgroundColor: '#FEEBC8', textColor: '#DD6B20' }; // Light orange background, dark orange text
            case 'CANCELED':
                return { label: 'CANCELLED', backgroundColor: '#FED7D7', textColor: '#E53E3E' }; // Light red background, dark red text
            case 'DELIVERED':
                return { label: 'DELIVERED', backgroundColor: '#C6F6D5', textColor: '#38A169' }; // Light green background, dark green text
            default:
                return { label: 'Unknown', backgroundColor: '#E2E8F0', textColor: '#2D3748' }; // Light gray background, dark gray text
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
        alignSelf: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
    },
});
