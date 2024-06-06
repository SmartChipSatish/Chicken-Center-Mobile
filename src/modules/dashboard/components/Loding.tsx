import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { THEME_COLORS } from '../../../globalStyle/GlobalStyles';

const Loding = ({type}:{type?:string}) => (
    <View style={[styles.overlay,{ backgroundColor: type==='login'?'rgba(0, 0, 0, 0.5)':'rgba(0, 0, 0, 0.1)'}]}>
        <ActivityIndicator size="large" color={THEME_COLORS.secondary} />
    </View>
);

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default Loding;