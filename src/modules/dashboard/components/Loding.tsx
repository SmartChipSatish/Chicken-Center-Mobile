import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loding = () => (
    <View style={[styles.overlay]}>
        <ActivityIndicator size="large" />
    </View>
);

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        top: 20,
      },
});

export default Loding;