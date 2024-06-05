import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { THEME_COLORS } from '../../../globalStyle/GlobalStyles'

const TabButton = ({ label, isSelected, onPress }: any) => {
    const backgroundColor = isSelected ? THEME_COLORS.secondary : THEME_COLORS.primary;
    const color = isSelected ? THEME_COLORS.primary : '#000'
    return (
        <TouchableOpacity style={[styles.tabButton, { backgroundColor }]} onPress={onPress}>
            <Text style={[styles.tabText,{ color }]}>{label}</Text>
        </TouchableOpacity>
    )
}

export default TabButton

const styles = StyleSheet.create({
    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    tabText: {
        fontWeight: 'bold',
    }
})