
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { TEXT_COLORS, TEXT_FONT_SIZE, THEME_COLORS } from '../../../globalStyle/GlobalStyles';
import { useGetOrderByIdMutation } from '../store/services/OrdersEndpoint';
import Loding from '../../dashboard/components/Loding';
import { Order, OrderItem } from '../utils/constants';
import CrossMark from '../../../assets/svgimages/util';
import StatusButton from './StatusButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import RatingDisplay from '../../../sharedFolders/components/RatingDisplay';
import RateOrder from './RateOrder';

export default function OrderSummary({ orderId, setModalVisible1, orderStatus }: { orderId: string, setModalVisible1: () => void, orderStatus: string }) {
    const user = useSelector((store: RootState) => store.user.user);

    const [ordersData, setOrdersData] = useState<OrderItem[]>()
    const [totalOrder, setTotalOrder] = useState<Order>();
    const [addressId, setAddressId] = useState('');
    const [address, setAddress] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false)
    const [getOrders] = useGetOrderByIdMutation();
    const [paymentStatus, setPaymentStatus] = useState<string>('')

    const getOrderData = async () => {
        setIsLoading(true)
        try {
            setIsLoading(true)
            const response = await getOrders(orderId);
            if (response?.data) {
                setOrdersData(response?.data?.items)
                setTotalOrder(response?.data)
                setAddress(response?.data?.userId?.secondaryAddress)
                setAddressId(response?.data?.addressId)
                setPaymentStatus(response?.data?.paymentStatus.toString())
            }
            console.log(response?.data, 'ordersSummary')
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getOrderData();
    }, [orderId])


    const calculateTotalPrice = (items: OrderItem[] | undefined) => {
        return items?.reduce((acc: number, item: OrderItem) => acc + item?.itemPrice * Number(item.itemQty), 0);
    };
    const formatDate = (dateString: string | number | Date) => {
        const options: any = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    const itemsPrice = (totalOrder?.totals ? totalOrder?.totals?.amount : calculateTotalPrice(ordersData)) || 0;
    const deliveryFee = totalOrder?.deliveryFee || 0;
    const addons = totalOrder?.addons || 0;
    const discount = totalOrder?.discountPercentage || 0;
    const coupon = totalOrder?.coupon || 0;
    const total = itemsPrice + deliveryFee + addons - (coupon + discount);
    const [show, setShow] = useState(false);

    const findAddressById = (address: any[], addressId: string) => {
        return address.find((res: any) => res._id === addressId)
    }
    const selectedAddress = findAddressById(address, addressId)
    console.log(selectedAddress, 'address')
    const formatMobileNumber = (mobileNumber: string) => {
        if (mobileNumber.startsWith('+91')) {
            return mobileNumber.slice(3);
        } else if (mobileNumber.startsWith('91') && mobileNumber.length === 12) {
            return mobileNumber.slice(2);
        } else {
            return mobileNumber;
        }
    };
    const formattedNumber = user ? formatMobileNumber(user.primaryNumber.toString()) : '';
    const handleClose = () => {
        setShow(false)
    }
    console.log(orderStatus, 'orderStatus')
    return (

        <View>
            <View style={styles.orderHeader}>
                <Text style={styles.orderSummarys}>Order Summary</Text>
                <TouchableOpacity
                    onPress={() => {
                        setModalVisible1()
                    }}>
                    <CrossMark color={'black'} width={20} height={20} style={{ marginRight: '2%' }}></CrossMark>
                </TouchableOpacity>
            </View>

            {!isLoading ?
                <ScrollView style={styles.container}>
                    {ordersData && ordersData?.length > 0 && ordersData.map((item: OrderItem) => (
                        <View key={item?._id} style={styles.card}>
                            <Image style={styles.tinyLogo} source={{ uri: item?.imageUrl }} />
                            <View style={styles.cardContent}>
                                <Text style={styles.title}>{item?.itemName}</Text>
                                <Text style={styles.price1}>Qty:{item?.itemQty}</Text>
                                <Text style={styles.price}>₹{item?.itemPrice}</Text>
                                <View style={styles.rightAlign}>
                                </View>
                            </View>
                        </View>
                    ))}


                    <View style={styles.cards}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>

                            <Text style={styles.Billdetails}>Bill Details</Text>
                            <StatusButton status={orderStatus} />

                        </View>
                        <View style={styles.row}>
                            <Text style={styles.leftTexts}>MRP</Text>
                            <Text style={styles.rightAmount}>₹{itemsPrice}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.leftTexts}>Product discount</Text>
                            <Text style={styles.rightAmount}>₹{discount}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.leftTexts}>Item total</Text>
                            <Text style={styles.rightAmount}>₹{coupon}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.leftTexts}>Handling charges</Text>
                            <Text style={styles.rightAmount}>₹{deliveryFee}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.leftTexts, styles.textColor]}>Bill total</Text>
                            <Text style={[styles.rightAmount, styles.textColor]}>₹{total}</Text>
                        </View>
                    </View>
                    <View style={styles.cards}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={styles.Billdetails}>Order Details</Text>
                            <TouchableOpacity onPress={() => setShow(true)}>
                                <RatingDisplay rating={4.3} votes={2925} />
                            </TouchableOpacity>

                            {/* <StatusButton status='DELIVERED'/>   */}
                        </View>

                        <Text style={styles.AlltextColors}>Order id</Text>
                        <Text style={[styles.AlltexFonts, styles.textColor]}>#{orderId}</Text>
                        <Text style={styles.AlltextColors}>UserName</Text>
                        <Text style={styles.AlltexFonts}>{user?.name}</Text>
                        <Text style={styles.AlltextColors}>Mobile</Text>
                        <Text style={styles.AlltexFonts}>{formattedNumber}</Text>
                        <Text style={styles.AlltextColors}>Payment</Text>
                        <Text style={styles.AlltexFonts}>{paymentStatus === 'PENDING' ? 'Cash On Delivery' : 'Online'}</Text>
                        <Text style={styles.AlltextColors}>Deliver to</Text>
                        <Text style={styles.AlltexFonts}>{`${selectedAddress?.name || ''} ${selectedAddress?.landmark || ''} ${selectedAddress?.city || ''} ${selectedAddress?.state || ''} ${selectedAddress?.pincode || ''}`}</Text>
                        <Text style={styles.AlltextColors}>Order Placed</Text>
                        <Text style={styles.AlltexFonts}>{formatDate((totalOrder?.updatedAt) || '')}</Text>
                    </View>
                </ScrollView> :
                <View style={styles.loading}>
                    <Loding />
                </View>
            }
            {show && <RateOrder show={show} handleClose={handleClose} />}


        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        // backgroundColor: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',

    },
    AlltextColors: {
        color: "#626364",
        fontWeight: "400",
        margin: 5
    },
    orderSummarys: {
        color: TEXT_COLORS.primary,
        fontSize: TEXT_FONT_SIZE.large,
        marginLeft: 5,
        height: 35,
        fontWeight: '600'
    },

    cards: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 4,
        padding: 16,
        marginBottom: 16,
    },
    AlltexFonts: {
        color: '#626364',
        fontWeight: "600",
        marginBottom: 15,
        marginLeft: 5
    },
    Billdetails: {
        fontWeight: "bold",
        color: "#626364",
        fontSize: 20,
        marginBottom: 10
    },
    discounts: {
        color: "green",
        fontSize: 8,
        fontWeight: "bold"
    },
    orderHeader: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 57,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 100, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    crossMark: {
        top: 5
    },
    OrderDetails: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 5,

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
        color: THEME_COLORS.secondary,
        marginVertical: 5,
        fontWeight: "bold"
    },
    price1: {
        fontSize: 13,
        color: TEXT_COLORS.secondary,
        marginVertical: 5,
        fontWeight: '800'
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
        color: '#626364',
    },
    rightAmount: {
        fontSize: TEXT_FONT_SIZE.small,
        textAlign: 'right',
        color: '#626364',

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
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});