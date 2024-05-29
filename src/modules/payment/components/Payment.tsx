import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import axios from 'axios';
import { CFErrorResponse, CFPaymentGatewayService } from 'react-native-cashfree-pg-sdk';
import {
  CFDropCheckoutPayment,
  CFEnvironment,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFSession,
  CFThemeBuilder,
  CFUPIIntentCheckoutPayment,
} from 'cashfree-pg-api-contract';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useInitiateOrderMutation, useVerifyOrderMutation } from '../store/services/PaymentEndpoints';
import { setClearCart } from '../../home/store/slices/CartProductsSlice';
import { TEXT_COLORS, THEME_COLORS } from '../../../globalStyle/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCreateOrderMutation } from '../../orders/store/services/OrdersEndpoint';
import { RootState } from '../../../store/store';
import OrderConfirmationScreen from '../../orders/components/OrderConfirmationScreen';
import { setShowQuantityReset } from '../../home/store/slices/ProductsListSlice';

const Payment = ({ totalAmount, type }: { totalAmount: number, type: string}) => {
  const navigate = useNavigation<any>();
  const cartItems = useSelector((store: RootState) => store.cartProducts.cartProducts);
  const cartPriceDetails =useSelector((state:RootState)=> state.cartProducts.cartPriceDetails);
  const totalQuantity = cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0);
  const [orderId, setOrderId] = useState('')
  console.log(type, 'paymentType')
  const [createData] = useCreateOrderMutation();
  const items = cartItems.map(item =>  {
    return({
        itemId:item.id,
        itemQty:item.quantity,
        itemPrice:item.itemPrice,
        amount:item.total,
        imageUrl:item.imageUrl,
        itemName: item.itemName
    })
} );
  const createOrder1 = async () => {
    try {
        const storedUid = await AsyncStorage.getItem('userId');
        console.log(storedUid)
        const uid = storedUid?.replace(/['"]/g, '').trim();
        console.log(uid,'uid')
        const response = await createData({
            userId: uid,
            createdBy: uid,
            updatedBy: uid,
            addressId:'6655d6dff9c814266aef1d6e',
            paymentType: type,
            items: items,
            totals: {
                quantity: totalQuantity,
                amount: cartPriceDetails.total
              }
        }).unwrap();
       console.log(response, 'response')
        const orderId=response._id;
        if(response && orderId){
          if(type === 'online'){
            startCheckout(orderId)
          }else if(type === 'upi'){
            startUPICheckout(orderId)
          }
        }else{
          updateStatus('OrderId Not Found')
        }
    } catch (error) {
        console.error('Error:', error);
    }

};
  const [initiateOrder] = useInitiateOrderMutation();
  const createOrder = async (orderId:string) => {
    try {
      const response = await initiateOrder({
        customerName: 'Nasa2',
        customerEmail: 'Nasa2@gmail.com',
        customerPhone: '+919876243167',
        orderId: orderId,
        totalAmount: totalAmount
      });
      console.log(response.data, 'createOrders');
      return response.data;
    } catch (err) {
      console.log(err, 'createOrderError');
      ToastAndroid.showWithGravity('Failed to create order. Please try again.', ToastAndroid.LONG, ToastAndroid.CENTER);
      return null;
    }
  };
  const dispatch = useDispatch()
  const [paymentVerify] = useVerifyOrderMutation();
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
}
  const verifyPayment = async (orderID: string) => {
    try {
      let res = await paymentVerify({ orderId: orderID })
      console.log(res.data, 'verifypayment')
      if (res.data) {
        dispatch(setClearCart())
        dispatch(setShowQuantityReset(''))
        setShow(true)
        // Dialog.show({
        //   type: ALERT_TYPE.SUCCESS,
        //   title: 'Success',
        //   textBody: 'Payment Verified',
        //   button: 'close',
        // })
      }

    } catch (error: any) {
      console.log(error, 'verifyError')
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failure',
        textBody: error,
        button: 'close',
      })
    }
  }

  const startCheckout = async (orderId:string) => {
    try {
      const orderData = await createOrder(orderId);
      const session = getSession(orderData);
      const paymentModes = new CFPaymentComponentBuilder()
        .add(CFPaymentModes.CARD)
        .add(CFPaymentModes.UPI)
        .add(CFPaymentModes.NB)
        .add(CFPaymentModes.WALLET)
        .add(CFPaymentModes.PAY_LATER)
        .build();
      const theme = new CFThemeBuilder()
        .setNavigationBarBackgroundColor(THEME_COLORS.secondary)
        .setNavigationBarTextColor(TEXT_COLORS.primary)
        .setButtonBackgroundColor(THEME_COLORS.secondary)
        .setButtonTextColor(TEXT_COLORS.primary)
        .setPrimaryTextColor(TEXT_COLORS.primary)
        .setSecondaryTextColor(TEXT_COLORS.primary)
        .build();
      const dropPayment = new CFDropCheckoutPayment(
        session,
        paymentModes,
        theme,
      );
      CFPaymentGatewayService.doPayment(dropPayment)
    } catch (error) {
      console.log(error, 'checkoutError')
    }
  };

  const startUPICheckout = async (orderId:string) => {
    try {
      const orderData = await createOrder(orderId);
      const session = getSession(orderData);
      const theme = new CFThemeBuilder()
        .setNavigationBarBackgroundColor('#E64A19')
        .setNavigationBarTextColor('#FFFFFF')
        .setButtonBackgroundColor('#FFC107')
        .setButtonTextColor('#FFFFFF')
        .setPrimaryTextColor('#212121')
        .setSecondaryTextColor('#757575')
        .build();
      const upiPayment = new CFUPIIntentCheckoutPayment(session, theme);
      CFPaymentGatewayService.doUPIPayment(upiPayment);
      
    } catch (e: any) {
      console.log(e.message);
    }
  };


  const getSession = (orderData: any) => {
    return new CFSession(
      orderData.payment_session_id,
      orderData.order_id,
      CFEnvironment.SANDBOX,
    );
  };
  const updateStatus = (message: string) => {
    ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.CENTER);
  };


  useEffect(() => {
    CFPaymentGatewayService.setEventSubscriber({
      onReceivedEvent(eventName: string, map: Map<string, string>): void {
      },
    });
    CFPaymentGatewayService.setCallback({
      onVerify(orderID: string): void {
        console.log('orderId is :' + orderID);
        verifyPayment(orderID)
        updateStatus(orderID);
      },
      onError(error: CFErrorResponse, orderID: string): void {
        updateStatus(JSON.stringify(error));
      },
    });
    return () => {
      CFPaymentGatewayService.removeCallback();
      CFPaymentGatewayService.removeEventSubscriber();
    };
  }, []);

  return (
    <>
      <View style={styles.container}>

        <View>
          <TouchableOpacity onPress={createOrder1}>
            <Text style={styles.text}>Confirm Order</Text>
          </TouchableOpacity>
          <AlertNotificationRoot>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              {/* No button needed since the verifyPayment is triggered by the useEffect */}
            </View>
          </AlertNotificationRoot>
        </View>
       {/* {show && <OrderConfirmationScreen show={show} handleClose={handleClose}/>} */}
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  btn: {
    margin: 20,
    // backgroundColor: THEME_COLORS.secondary,
    width: '50%',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // color: TEXT_COLORS.primary
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default Payment;