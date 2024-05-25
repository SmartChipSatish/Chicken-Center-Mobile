
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { TEXT_COLORS, TEXT_FONT_SIZE, THEME_COLORS } from '../GlobalStyles/GlobalStyles';
import { RootState } from '../store/store';

export default function OrderSummary() {
    const cartItems = useSelector((store: RootState) => store.cartProducts.cartProducts);
    const [priceList,setPriceList]=useState({itemsPrice:0,addons:0,discount:0,coupon:0,deliveryFee:100})
    const [total,setTotal]=useState(0);
    const distach=useDispatch();
    
    useEffect(()=>{
        const data=cartItems.filter((e)=>{
            return e.total
        })

        if (data) {
            const totalprice = (data.reduce((a, b) => a + b.total, 0))
            setPriceList({ ...priceList, itemsPrice: totalprice })
            const total = totalprice + priceList.deliveryFee + priceList.addons - (priceList.coupon + priceList.discount);
            setTotal(total)
        }
        

    },[cartItems])
    return (
       <View style={{width:"100%"}}>
        <Text style={styles.orderSummarys}>Order Summary</Text>
        {cartItems.length>0 ? <ScrollView >
            <View style={styles.container}>
             {/*displaying items here */}
                {cartItems.map((item:any, index:number) => (
                    <View key={index} style={styles.card}>
                        <Image style={styles.tinyLogo} source={{ uri: item.imgUrl }} />
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.price1}>Qty:{item.quantity}</Text>
                            <Text style={styles.price}>₹{item.price* item.quantity}</Text>
                            <View style={styles.rightAlign}>
                    
                            </View>
                        </View>
                    </View>
                ))}
               
               
                <View style={[styles.containers,styles.cards]}>
                <Text style={styles.Billdetails}>Bill details</Text>
                    <View style={styles.row}>
                        <Text style={styles.leftTexts}>MRP</Text>
                        <Text style={styles.rightAmount}>₹{priceList.itemsPrice}</Text>
                    </View>
                   
                    <View style={styles.row}>
                        <Text style={styles.leftTexts}>Product discount</Text>
                        <Text style={styles.rightAmount}>₹{priceList.discount}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.leftTexts}>Item total</Text>
                        <Text style={styles.rightAmount}>₹{priceList.coupon}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.leftTexts}>Handling charges</Text>
                        <Text style={styles.rightAmount}>₹{priceList.deliveryFee}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.leftTexts, styles.textColor]}>Bill total</Text>
                        <Text style={[styles.rightAmount, styles.textColor]}>₹{total}</Text>
                    </View>
                </View>
                
                <View style={styles.cards}>
                <Text style={styles.Billdetails}>Order details</Text>
                    <Text style={styles.AlltextColors}>Order id</Text>
                    <Text style={styles.AlltexFonts}>0RD458934</Text>
                    <Text style={styles.AlltextColors}>Payment</Text>
                    <Text style={styles.AlltexFonts}>Paid Online</Text>
                    <Text style={styles.AlltextColors}>Deliver to</Text>
                    <Text style={styles.AlltexFonts}>Ramesh Nakka coalmine nilayam 1.N.R.R PURAM,ganesh nilayam madhapur hyderabad</Text>
                    <Text style={styles.AlltextColors}>Order placed</Text>
                    <Text style={styles.AlltexFonts}>placed on Fri,12 Apr24,11:43 PM</Text>
                </View>
            </View>
        </ScrollView> : <Text>No Details</Text>}
       </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        marginTop:10
        
    },
    AlltextColors:{
        color:"grey",
        fontWeight:"bold",
        margin:5
    },
    orderSummarys:{
        color:TEXT_COLORS.primary,
        fontSize:TEXT_FONT_SIZE.large,
        marginLeft:15,
        fontWeight:"bold",
        marginTop:-5

    },

    cards: {
        
        backgroundColor: '#fff',
        marginBottom: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        padding: 10,
      },
    AlltexFonts:{
        color:"black",
        fontWeight:"bold",
        margin:5
    },
    Billdetails:{fontWeight:"bold",color:"black",margin:5,fontSize:20},
    discounts: {
        color: "green",
        fontSize: 8,
        fontWeight: "bold"
    },
    OrderDetails:{
        display:'flex',
        flexDirection:"column",
        justifyContent:"space-between",
        padding:5,
      
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
    price1: {
        fontSize: 13,
        color: TEXT_COLORS.secondary,
        marginVertical: 5,
        
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

