import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { CashonDeliveryIcon, OnelineIcon, UpiIcon } from '../../../assets/svgimages/HomeSvgs/svgsIcons'
import { TEXT_COLORS, TEXT_FONT_SIZE, THEME_COLORS } from '../../../GlobalStyles/GlobalStyles'
import { TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { LocationIcon } from '../../../assets/svgimages/SaveAsIcons'
import Payment from '../../../payment/Payment'

export default function Checkout({ route }: any) {
    const { totalAmount } = route.params;
    const navigation = useNavigation<any>();
    const [paymentType, setpaymentType] = useState('cash');
    const locations = useSelector((store: RootState) => store.locations.locations);
    const [indexSelect, setInedx] = useState<number>(0);

    return (
        <View style={style.container}>
            <ScrollView style={style.sub_container}
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}>
                <View style={style.addAddress}>
                    <Text style={style.add_text}>Delivery Address</Text>
                    <Text style={style.add_btn} onPress={() => navigation.navigate('addaddress')}>+ Add New Address</Text>
                </View>
                <View style={style.address_container}>
                    {locations.length > 0 ? locations.map((e, index: number) => {
                        return <TouchableOpacity style={[style.location, { backgroundColor: indexSelect === index ? `${THEME_COLORS.light_color}` : 'white' }]}
                            key={index}
                            onPress={() => setInedx(index)}>
                            <LocationIcon />
                            <Text>{e.address}</Text>
                        </TouchableOpacity>
                    }) : <Text>No address available</Text>}

                </View>
                <View style={style.payment}>
                    <Text style={style.payment_text}>Payment Method</Text>
                </View>
                <ScrollView horizontal={true}>
                <View style={style.payment_types}>
                    
                    <View style={[style.payment_mode, 
                                             { backgroundColor: paymentType === 'cash' ? `${THEME_COLORS.light_color}` : 'white' }]}>
                    <TouchableOpacity 
                        onPress={() => setpaymentType('cash')}>
                        <Text style={[style.paymentmode_text, { color: paymentType === 'cash' ? `white` : 'black' }]}>Cash On Delivery</Text>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <CashonDeliveryIcon />
                        </View>
                       
                    </TouchableOpacity>
                    </View>

                    <View style={[style.payment_mode, 
                                             { backgroundColor: paymentType === 'upi' ? `${THEME_COLORS.light_color}` : 'white' }]}>
                    <TouchableOpacity 
                        onPress={() => setpaymentType('upi')}>
                        <Text style={[style.paymentmode_text, { color: paymentType === 'upi' ? `white` : 'black' }]}>Pay with UPI</Text>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <UpiIcon/>
                        </View>
                    </TouchableOpacity>
                    </View>

                   <View style={[style.payment_mode,
                    { backgroundColor: paymentType === 'online' ? `${THEME_COLORS.light_color}` : 'white' }]}>
                    <TouchableOpacity 
                        onPress={() => setpaymentType('online')}>
                        <Text style={[style.paymentmode_text, { color: paymentType === 'online' ? `white` : 'black' }]}>Pay Online</Text>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <OnelineIcon />
                        </View>
                    </TouchableOpacity>
                    </View>
                </View> 
                
                </ScrollView>
                
                <View style={style.note_container}>
                    <TextInput
                        multiline={true}
                        numberOfLines={5}
                        style={style.note} />
                </View>
            </ScrollView>
            
            <TouchableOpacity style={style.confirm_order}>
                {paymentType === 'cash' &&
                    <Text style={style.cashBtn} onPress={()=>navigation.navigate('orders')}>
                        Confirm Order
                    </Text>}
                    {paymentType === 'upi' && <Payment totalAmount={totalAmount} type={'upi'}/>}
                   {paymentType === 'online' && <Payment totalAmount={totalAmount} type={'online'} />}
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }, 
    sub_container: {
        marginLeft: 6,
        marginRight: 6
    },
    addAddress: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    }, add_btn: {
        color: '#4E3AFF',
        fontSize: 16,
    },
    add_text: {
        color: 'black',
        fontSize: 16
    },
    address_container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    payment_text: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
    payment: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    payment_types: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        width:'95%'
    },
    payment_mode: {
        borderWidth: 1,
        width: 150,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: `${TEXT_COLORS.primary}`,
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
    }, note_container: {
        marginTop: 20
    },
    note: {
        height: 100,
        textAlignVertical: 'top',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        shadowColor: `${TEXT_COLORS.primary}`,
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 5,
    },
    confirm_order: {
        marginBottom: 20,
        backgroundColor: THEME_COLORS.secondary,
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        left: '25%',
    },
    paymentmode_text: {
        color: `${TEXT_COLORS.primary}`,
        fontSize: 16,
    },
    location: {
        borderColor: '#ddd',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: `${TEXT_COLORS.primary}`,
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 5,
        width: '95%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    cashBtn: { 
        color: THEME_COLORS.primary, 
        fontSize: TEXT_FONT_SIZE.medium, 
        fontWeight: 'bold' 
    }
})