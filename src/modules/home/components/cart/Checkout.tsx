import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Button, Alert } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootState } from '../../../../store/store'
import { useCreateOrderMutation } from '../../../orders/store/services/OrdersEndpoint'
import { Cross, DownArrow, LocationIcon, Menuicon } from '../../../../assets/svgimages/SaveAsIcons'
import { CashonDeliveryIcon, OnelineIcon, UpiIcon } from '../../../../assets/svgimages/HomeSvgs/svgsIcons'
import { THEME_COLORS, TEXT_COLORS, TEXT_FONT_SIZE } from '../../../../globalStyle/GlobalStyles'
import Payment from '../../../payment/components/Payment'
import OrderConfirmationScreen from '../../../orders/components/OrderConfirmationScreen'
import { setClearCart } from '../../store/slices/CartProductsSlice'
import { setShowQuantityReset } from '../../store/slices/ProductsListSlice'
import { ActivityIndicator } from 'react-native-paper'
import { useDeleteAddressMutation, useGetAddressByuserMutation, } from '../../../accounts/components/afterLogin/Addresses/store/AddressEndpoints'
import { useFocusEffect } from '@react-navigation/native';
import { setItemid } from '../../../accounts/store/slices/LocationSlice'
import CrossMark from '../../../../assets/svgimages/util'

export default function Checkout({ route }: any) {
    const [modalVisible, setModalVisible] = useState<any>(false);
    const [modalVisibles, setModalVisibles] = useState(false);
    const [getAddressByUser] = useGetAddressByuserMutation()
    const [deleteUserAddress] = useDeleteAddressMutation()
    const [everyoneAddress, setSome] = useState<any>([])
    const { totalAmount } = route.params;
    const dispatch = useDispatch();
    const navigation = useNavigation<any>();
    const [paymentType, setpaymentType] = useState('cash');
    const locations = useSelector((store: RootState) => store.locations.locations);
    const [indexSelect, setInedx] = useState<number>(0);
    const [createData] = useCreateOrderMutation();
    const [orderId, setOrderId] = useState('');
    const cartItems = useSelector((store: RootState) => store.cartProducts.cartProducts);
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const getLocations = useSelector((store: RootState) => store.locations.displayAddressesall);
    const [selectedAddress, setSelectedAddress] = useState<any>();
    const itemsids = useSelector((store: RootState) => store.locations.itemId);
    const [addressId, setAddressId] = useState<any>({})
    console.log(addressId?._id, "syamid--------------")
    const items = cartItems.map(item => {
        return ({
            itemId: item?.id,
            itemQty: item?.quantity,
            itemPrice: item?.itemPrice,
            amount: item?.total,
            imageUrl: item?.imageUrl,
            itemName: item?.itemName
        })
    });

    const totalQuantity = cartItems.reduce((accumulator, item) => accumulator + item?.quantity, 0);

    const createOrder = async () => {
        if (addressId?._id && paymentType !== '') {
            setIsLoading(true)
            try {
                const storedUid = await AsyncStorage.getItem('userId');
                const uid = storedUid?.replace(/['"]/g, '').trim();
                const response = await createData({
                    userId: uid,
                    createdBy: uid,
                    updatedBy: uid,
                    addressId: addressId?._id,
                    paymentType: paymentType,
                    items: items,
                    totals: {
                        quantity: totalQuantity,
                        amount: totalAmount
                    }
                }).unwrap();

                setOrderId(response?._id)
                if (response && response?._id) {
                    dispatch(setClearCart())
                    dispatch(setShowQuantityReset(''))
                    setShow(true)
                }
                setTimeout(() => { setIsLoading(false); }, 1000);
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            Alert.alert('Select Address and Payment type');
        }
    };

    const handleClose = () => {
        setShow(false)
    }
    const toggleModal = () => {

        setModalVisible(!modalVisible);
    };
    const selectAddress = (address: any) => {
        setSelectedAddress(address);
        toggleModal();
    };

    const getAllAddresses = async () => {
        const value = await AsyncStorage.getItem('userId');
        const userId = value ? JSON.parse(value) : null;
        try {
            const getdata = await getAddressByUser(userId).unwrap();


            if (getdata.secondaryAddress && getdata.secondaryAddress.length > 0) {
                setSome(getdata.secondaryAddress);
                setSelectedAddress(getdata.secondaryAddress[0]);
            } else {
                //  createAllAddressesSecond(true);
            }

        } catch (error) {
            console.log(error);
        }
    };
    useFocusEffect(useCallback(() => {
        {
            getAllAddresses();
        }
    }, []))

    const handleDeleteAddress = async () => {
        try {
       await deleteUserAddress({ id: addressId?._id, status: false }).unwrap();
            const deleteAddress = everyoneAddress.filter((item: any) => item?._id !== addressId?._id);
            setSome(deleteAddress);
        } catch (error) {
            console.log(error);
        }
    };


    useFocusEffect(useCallback(() => {
        {
            setAddressId(selectedAddress)
        }
    }, [selectedAddress]))



    const userone = (e: any) => {
        // console.log(e,"syamid")
        setAddressId(e)

    }

    return (
        <View style={style.container}>
            <ScrollView style={style.sub_container}
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}>
                <View style={style.card2}>
                    <View style={style.addAddress}>
                        <Text style={style.add_text}>Delivery Address</Text>
                        <Text style={style.add_btn} onPress={() => navigation.navigate('addaddress')}>+ Add New Address</Text>
                    </View>

                    <View style={style.separator}></View>
                    <View>
                        {everyoneAddress?.length > 0 ?
                            <TouchableOpacity style={style.card1} onPress={() => { toggleModal() }}>
                                <View style={style.one}>
                                    <LocationIcon fill={"orange"}  height={20} width={20} />
                                    <Text
                                        style={style.textLoc}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        <Text style={style.text1}>
                                            {selectedAddress?.city || ''} 
                                        </Text>
                                        <Text> </Text> {`${selectedAddress?.name || ''} ${selectedAddress?.landmark || ''} ${selectedAddress?.city || ''} ${selectedAddress?.state || ''} ${selectedAddress?.pincode || ''}`}
                                    </Text>
                                    <DownArrow height={30} width={30} />
                                </View>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => navigation.navigate('addaddress')} >
                                <Text style={style.addADDRESS} >Add Address</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={style.payment}>
                    <Text style={style.payment_text}>Payment Method</Text>
                </View>
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <View style={style.payment_types}>
                        <View style={[style.payment_mode,
                        { backgroundColor: paymentType === 'cash' ? `${THEME_COLORS.light_color}` : 'white' }]}>
                            <TouchableOpacity
                                onPress={() => setpaymentType('cash')}>
                                <Text style={[style.paymentmode_text, { color: paymentType === 'cash' ? `white` : 'black' }]}>Cash On Delivery</Text>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <CashonDeliveryIcon />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[style.payment_mode,
                        { backgroundColor: paymentType === 'upi' ? `${THEME_COLORS.light_color}` : 'white' }]}>
                            <TouchableOpacity
                                onPress={() => setpaymentType('upi')}>
                                <Text style={[style.paymentmode_text, { color: paymentType === 'upi' ? `white` : 'black' }]}>Pay with UPI</Text>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <UpiIcon />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[style.payment_mode,
                        { backgroundColor: paymentType === 'online' ? `${THEME_COLORS.light_color}` : 'white' }]}>
                            <TouchableOpacity
                                onPress={() => setpaymentType('online')}>
                                <Text style={[style.paymentmode_text, { color: paymentType === 'online' ? `white` : 'black' }]}>Pay Online</Text>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
            <View style={{justifyContent:'center',alignItems:'center'}}>
            {paymentType === 'cash' ?
                <TouchableOpacity style={[style.confirm_order,{backgroundColor:(addressId?._id && paymentType) ?THEME_COLORS.secondary: THEME_COLORS.light_color}] }
                                  onPress={createOrder}>
                    {isLoading && <ActivityIndicator size="small" color={THEME_COLORS.primary} />}
                    <Text style={style.cashBtn}  disabled={isLoading}>
                        Confirm Order
                    </Text>
                </TouchableOpacity> :
                <Payment totalAmount={totalAmount} type={paymentType} addressId={addressId?._id}/>}
            {show && <OrderConfirmationScreen show={show} handleClose={handleClose} totalAmount={totalAmount} orderId={orderId} />}
            </View>
            <View>
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={toggleModal}
                >
                    <View style={style.modalContainer}>
                        <View style={style.modalContent}>
                            <TouchableOpacity onPress={() => { setModalVisible(!modalVisible) }}>
                                <View style={style.crossIcon}>
                                    <View >
                                        <Cross height={17} width={17} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <Text style={style.colorsText}>Choose a Delivery Address</Text>
                            <View style={style.separator1}></View>
                            <ScrollView>
                                <TouchableOpacity onPress={() => navigation.navigate('addaddress')} >
                                    <Text style={style.addADDRESS} >Add Address</Text>
                                </TouchableOpacity>
                                {everyoneAddress.map((e: any, indexex: any) => (
                                    <View>
                                        <TouchableOpacity
                                            key={indexex}
                                            style={style.card}
                                            onPress={() => { setSelectedAddress(e); userone(e); toggleModal(); dispatch(setItemid(e)) }}
                                        >
                                            <View>
                                                <View style={style.textIcons} >
                                                    <LocationIcon fill={"orange"}  height={20} width={20}></LocationIcon>
                                                    <Text style={style.text2} numberOfLines={1} ellipsizeMode="tail">{e?.city || ''}</Text>
                                                </View>
                                                <Text style={style.text}>
                                                    {` ${e?.name || ''}  ${e?.pincode || ''}`}
                                                </Text>
                                                <TouchableOpacity onPress={(event) => {
                                                    event.stopPropagation(); setModalVisibles(!modalVisibles); userone(e); dispatch(setItemid(e))
                                                }}>
                                                    <View style={style.icons} >
                                                        <Menuicon height={20} width={20}></Menuicon>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>

                {/* {Delete model} */}
                <Modal
                    transparent={true}
                    visible={modalVisibles}
                    onRequestClose={() => setModalVisibles(!modalVisibles)}
                >

                    <View style={style.modalBackground}>
                        <View style={style.modalContents}>
                           <TouchableOpacity onPress={()=>{
                            setModalVisibles(!modalVisibles)}}>
                                <View style={style.crossIcon}>
                                <Cross  height={10} width={10}></Cross>
                                </View>
                          
                           </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('payment') }}>
                                <Text style={{ color: "black", fontWeight: "bold" }}>Edit</Text>
                            </TouchableOpacity>
                            <View style={style.separator2}></View>

                            <TouchableOpacity onPress={() => { setModalVisibles(!modalVisibles); handleDeleteAddress(); }}>
                                <Text style={{ color: "black", fontWeight: "bold" }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>




            </View>
        </View>
    )
}
const style = StyleSheet.create({

    one: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textLoc: {

        fontFamily: 'Arial',
        fontSize: 12,
        color: 'black',
        lineHeight: 20,
        fontWeight: "bold",
        flex: 1,
    },
    text1: {
        fontWeight: "bold",
    },
    crossIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        marginRight: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textIcons: {
        display: "flex",
        flexDirection: "row",
        marginLeft: -20
    },
    sub_container: {
        marginLeft: 6,
        marginRight: 6
    },
    addADDRESS: {
        color: THEME_COLORS.primary,
        backgroundColor: THEME_COLORS.secondary,
        fontWeight: "bold",
        textAlign: 'center',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    icons: {
        color: "black",
        fontWeight: "bold",
        textAlign: "right",
        marginTop: -33,
        marginLeft: 300

    },

    addAddress: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    }, add_btn: {
        color: THEME_COLORS.secondary,
        fontSize: 16,
        fontWeight:'bold'
    },

    colorsText: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        padding: 5,
        width: "100%",

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
        width: '95%'
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
        // backgroundColor: THEME_COLORS.secondary,
        height: 45,
        borderRadius: 10,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
    },
    disableContainer: {
        marginBottom: 20,
        backgroundColor: THEME_COLORS.light_color,
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
        fontWeight: 'bold',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:'2%'
    },
    container1: {
        padding: 16,
    },
    card: {
        backgroundColor: '#F0F0F0',
        padding: 25,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#ddd',
        marginBottom: 10,
        width: 355,

    },
    card1: {
        backgroundColor: '#fff',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 5,
        marginVertical: -4,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    card2: {
        backgroundColor: '#fff',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    separator: {
        borderBottomWidth: 0.5,
        width: "100%",
        borderBottomColor: '#D3D3D3',
        marginVertical: 5,
        marginHorizontal: 0
    },
    separator1: {
        borderBottomWidth: 1,
        width: "100%",
        borderBottomColor: 'black',
        marginVertical: 10,
    },
    separator2: {
        borderBottomWidth: 1,
        width: "100%",
        borderBottomColor: '#D3D3D3',
        marginVertical: 10,
    },
    text: {
        marginLeft: -15,
        fontFamily: 'Arial',
        fontSize: 12,
        color: 'black',
        lineHeight: 20,
        fontWeight: "bold",


    },
    text2: {
        fontSize: 14,
        color: "black",
        fontWeight: "bold"
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: "95%",
        padding: 10,
        backgroundColor: THEME_COLORS.primary,
        alignItems: 'center',
        marginTop: "70%",
        borderRadius: 10,
        marginBottom: 200
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContents: {
        width: 150,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems:"center",
        marginRight: 30,
        marginTop:20
    },
})