
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { TEXT_COLORS, TEXT_FONT_SIZE, THEME_COLORS } from '../GlobalStyles/GlobalStyles';

export default function Cartitems() {
    const [items, setItems] = useState([
        {
            id: 1,
            name: 'Chicken chest',
            image: 'https://img.freepik.com/premium-photo/raw-whole-chicken-with-skin-arranged-grill_527904-677.jpg',
            priceBeforeDiscount: 150,
            price: 100,
            quantity: 1,
        },
        {
            id: 2,
            name: 'Chicken liver',
            image: 'https://media.istockphoto.com/photos/chicken-meat-picture-id1319903960?k=20&m=1319903960&s=612x612&w=0&h=_VBryQo-J1RmuBGCS6OIfKiimN5wnQEcyWnH6hywcjE=',
            priceBeforeDiscount: 200,
            price: 150,
            quantity: 1,
        },
        {
            id: 1,
            name: 'Chicken chest',
            image: 'https://img.freepik.com/premium-photo/raw-whole-chicken-with-skin-arranged-grill_527904-677.jpg',
            priceBeforeDiscount: 150,
            price: 100,
            quantity: 1,
        },
        {
            id: 2,
            name: 'Chicken liver',
            image: 'https://media.istockphoto.com/photos/chicken-meat-picture-id1319903960?k=20&m=1319903960&s=612x612&w=0&h=_VBryQo-J1RmuBGCS6OIfKiimN5wnQEcyWnH6hywcjE=',
            priceBeforeDiscount: 200,
            price: 150,
            quantity: 1,
        },
    ]);

    return (
       <View>
         <ScrollView>
            <View style={styles.container}>
             {/*displaying items here */}
                {items.map((item, index) => (
                    <View key={index} style={styles.card}>
                        <Image style={styles.tinyLogo} source={{ uri: item.image }} />
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>{item.name}</Text>
                            <Text style={styles.price}>₹{item.price}</Text>
                            <Text style={styles.discounts}>24% off</Text>
                            <View style={styles.rightAlign}>
                                <View style={styles.quantityContainer}>
                                    <Text style={styles.quantityButton}>-</Text>
                                    <Text style={styles.quantity}>{item.quantity}</Text>
                                    <Text style={styles.quantityButton}>+</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
                <View style={styles.inputAndButton}>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder="Enter Promo Code"
                        keyboardType="numeric"
                        placeholderTextColor={TEXT_COLORS.primary}
                    />
                    <Text style={styles.ApplyButton}>Apply</Text>
                </View>

                <View style={styles.containers}>
                    <View style={styles.row}>
                        <Text style={styles.leftTexts}>Items Price</Text>
                        <Text style={styles.rightAmount}>₹1,180</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.leftTexts}>Addons</Text>
                        <Text style={styles.rightAmount}>₹1,180</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.leftTexts}>Discount</Text>
                        <Text style={styles.rightAmount}>₹1,180</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.leftTexts}>Coupon Discount</Text>
                        <Text style={styles.rightAmount}>₹1,180</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.leftTexts}>Delivery Fee</Text>
                        <Text style={styles.rightAmount}>₹1,180</Text>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={styles.row}>
                        <Text style={[styles.leftTexts, styles.textColor]}>Total Amount</Text>
                        <Text style={[styles.rightAmount, styles.textColor]}>₹1096</Text>
                    </View>
                    <Text style={styles.buttonStyle}>Continue Checkout</Text>
                </View>
            </View>
        </ScrollView>
       </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
    },
    discounts: {
        color: "green",
        fontSize: 8,
        fontWeight: "bold"
    },
    input: {
        color: TEXT_COLORS.primary,
        width: 292,
        height: 50,
        backgroundColor: '#fff',
        shadowColor: '#000',
        marginLeft: 3,
        flexDirection: 'row',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        marginBottom: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
    },
    inputAndButton: {
        display: "flex",
        flexDirection: "row"
    },
    ApplyButton: {
        backgroundColor: THEME_COLORS.secondary,
        color: "white",
        fontWeight: "bold",
        width: 80,
        padding: 16,
        height: 50,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    buttonStyle: {
        color: "white",
        fontWeight: "bold",
        backgroundColor: THEME_COLORS.secondary,
        textAlign: "center",
        padding: 13,
        borderRadius: 10,
        fontSize: TEXT_FONT_SIZE.medium
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textColor: {
        color: THEME_COLORS.secondary,
        fontWeight: "bold",   
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
    },
    tinyLogo: {
        height: 80,
        width: 90,
        borderRadius: 8,
    },
    cardContent: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    title: {
        fontSize: TEXT_FONT_SIZE.small,
        color: TEXT_COLORS.primary,
    },
    price: {
        fontSize: TEXT_FONT_SIZE.medium,
        color: TEXT_COLORS.primary,
        marginVertical: 5,
        fontWeight: "bold"
    },
    rightAlign: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        padding: 5,
        position: "relative",
        bottom: 35
    },
    quantityButton: {
        fontSize: 16,
        color: 'maroon',
        paddingHorizontal: 10,
    },
    quantity: {
        fontSize: 16,
        color: TEXT_COLORS.primary,
        marginHorizontal: 10,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    leftText: {
        flex: 1,
    },
    rightText: {
        flex: 1,
        alignItems: 'flex-end',
    },

    containers: {
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    leftTexts: {
        flex: 1,
        fontSize: TEXT_FONT_SIZE.small,
        textAlign: 'left',
        color: TEXT_COLORS.primary,
    },
    rightAmount: {
        fontSize: TEXT_FONT_SIZE.small,
        textAlign: 'right',
        color: TEXT_COLORS.primary,
        
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: TEXT_COLORS.primary,
        marginVertical: 10,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },


});

