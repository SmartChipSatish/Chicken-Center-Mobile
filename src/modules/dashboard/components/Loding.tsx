import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { THEME_COLORS } from '../../../globalStyle/GlobalStyles';

const Loding = () => (
    <View style={[styles.overlay]}>
        <ActivityIndicator size="large" color={THEME_COLORS.secondary} />
    </View>
);

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default Loding;