
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { TEXT_COLORS, TEXT_FONT_SIZE, THEME_COLORS } from '../../../GlobalStyles/GlobalStyles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { QUANTITY_LIMIT, itemsDetails } from '../../utils/constents';
import { setRemoveItem, setcardQuantity } from '../../store/slices/CartProductsSlice';
import ProductsCard from '../ProductsList/ProductCard';
import { useNavigation } from '@react-navigation/native';
const empty_cart = require('../../../assets/Images/empty_cart.png');

export default function Cartitems() {

    const cartItems = useSelector((store: RootState) => store.cartProducts.cartProducts);
    const [priceList, setPriceList] = useState({ itemsPrice: 0, addons: 0, discount: 0, coupon: 0, deliveryFee: 100 })
    const [total, setTotal] = useState(0);
    const distach = useDispatch();
    const navigation=useNavigation<any>()
    const handleQuantity = (type: string, item: itemsDetails) => {
        if (type === 'add' && item.quantity !== QUANTITY_LIMIT) {
            const quantity = item?.quantity + 1
            const amount = (item?.price * quantity) || 0;
            distach(setcardQuantity({ id: item.id, quantity: quantity, total: amount }))
        } else if (type === 'remove' && item.quantity !== 1 && item?.total) {
            const amount = item?.total - item.price || 0;
            distach(setcardQuantity({ id: item.id, quantity: item?.quantity - 1, total: amount }))
        } else if (item.quantity === 1 && type === 'remove') {
            distach(setRemoveItem({ id: item.id }))
        }
    }

    useEffect(() => {
        const data = cartItems.filter((e) => {
            return e.total
        })
        if (data) {
            const totalprice = (data.reduce((a, b) => a + b.total, 0))
            setPriceList({ ...priceList, itemsPrice: totalprice })
            const total = totalprice + priceList.deliveryFee + priceList.addons - (priceList.coupon + priceList.discount);
            setTotal(total)
        }

    }, [cartItems]);

    return (
        <View >
            {cartItems.length > 0 ? <ScrollView keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {cartItems.map((item: itemsDetails, index: number) => (
                            <ProductsCard item={item}
                                type='cart'
                                handleQuantity={handleQuantity}
                            />
                        ))}
                    </View>
                    <View style={styles.inputAndButton}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Promo Code"
                            keyboardType="numeric"
                            placeholderTextColor={TEXT_COLORS.primary}
                        />
                        <View style={styles.ApplyButton}>
                        <Text style={{color:'white',fontWeight: "bold"}}>Apply</Text>
                        </View>
                    </View>

                    <View style={styles.containers}>
                        <View style={styles.row}>
                            <Text style={styles.leftTexts}>Items Price</Text>
                            <Text style={styles.rightAmount}>₹{priceList.itemsPrice}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.leftTexts}>Addons</Text>
                            <Text style={styles.rightAmount}>₹{priceList.addons}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.leftTexts}>Discount</Text>
                            <Text style={styles.rightAmount}>₹{priceList.discount}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.leftTexts}>Coupon Discount</Text>
                            <Text style={styles.rightAmount}>₹{priceList.coupon}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.leftTexts}>Delivery Fee</Text>
                            <Text style={styles.rightAmount}>₹{priceList.deliveryFee}</Text>
                        </View>
                        <View style={styles.separator}></View>
                        <View style={styles.row}>
                            <Text style={[styles.leftTexts, styles.textColor]}>Total Amount</Text>
                            <Text style={[styles.rightAmount, styles.textColor]}>₹{total}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>navigation.navigate('checkout')}>
                        <Text style={styles.buttonStyle} >Continue Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView> : <View style={styles.empty_cart}>
                <Image source={empty_cart}/>
                 <Text style={styles.emptycart_text}>Empty cart</Text>
                 <Text>Please Add Products</Text>
                 </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: THEME_COLORS.primary,
    },
    input: {
        color: TEXT_COLORS.primary,
        width: '70%',
        height: 50,
        backgroundColor: '#fff',
        shadowColor: '#000',
        flexDirection: 'row',
        borderBottomLeftRadius: 5,
        marginBottom: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
    },
    inputAndButton: {
        flexDirection: "row",
        justifyContent:'center',
        width:'100%'
    },
    ApplyButton: {
        backgroundColor: THEME_COLORS.secondary,
        color: "white",
        fontWeight: "bold",
        width: '20%',
        height: 50,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent:'center',
        alignItems:'center'
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

    textColor: {
        color: THEME_COLORS.secondary,
        fontWeight: "bold",
    },
    price: {
        fontSize: TEXT_FONT_SIZE.medium,
        color: TEXT_COLORS.primary,
        marginVertical: 5,
        fontWeight: "bold"
    },
    quantity: {
        fontSize: 16,
        color: TEXT_COLORS.primary,
        marginHorizontal: 10,
    },

    containers: {
        padding: 20,
        backgroundColor:THEME_COLORS.primary
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    leftTexts: {
        flex: 1,
        fontSize: 14,
        textAlign: 'left',
        fontWeight:'bold',
        color:'#928E8E'
    },
    rightAmount: {
        fontSize: 17,
        textAlign: 'right',
        color: '#696767',
        fontWeight:'bold',
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: TEXT_COLORS.primary,
        marginVertical: 10,
    },empty_cart:{
        justifyContent:'center',
        alignItems:'center',
    },emptycart_text:{
        color:'black',
        fontSize:18,
        fontWeight:'bold'
    }
});

