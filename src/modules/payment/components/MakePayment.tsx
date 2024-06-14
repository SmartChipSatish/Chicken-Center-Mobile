import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid, ActivityIndicator, Alert } from 'react-native';
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
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';
import { useDispatch, useSelector } from 'react-redux';
import { useInitiateOrderMutation, useVerifyOrderMutation } from '../store/services/PaymentEndpoints';
import { setClearCart } from '../../home/store/slices/CartProductsSlice';
import { TEXT_COLORS, THEME_COLORS } from '../../../globalStyle/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCreateOrderMutation } from '../../orders/store/services/OrdersEndpoint';
import { RootState } from '../../../store/store';
import OrderConfirmationScreen from '../../orders/components/OrderConfirmationScreen';
import { setShowQuantityReset } from '../../home/store/slices/ProductsListSlice';

const MakePayment = ({ totalAmount, type, addressId, orderId,onSuccess  }: { totalAmount: number, type: string, addressId: string, orderId: string,onSuccess:()=>void }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store: RootState) => store.cartProducts.cartProducts);
  const totalQuantity = cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0);
  const user = useSelector((store: RootState) => store.user.user);

  const [summaryOrderId, setSummaryOrderId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const [initiateOrder] = useInitiateOrderMutation();
  const [paymentVerify] = useVerifyOrderMutation();


  console.log(totalAmount, type, addressId, orderId, 'showwwww')
  const createOrder = async () => {
    console.log('ssslsls')
    setIsLoading(true)
    try {
      if (orderId) {
        console.log(orderId, 'orderId')
        startCheckout(orderId)
        setTimeout(() => { setIsLoading(false); }, 2000);
      } else {
        updateStatus('OrderId Not Found')
        setTimeout(() => { setIsLoading(false); }, 1000);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  const initOrder = async (orderId: string) => {
    try {
      const storedUid = await AsyncStorage.getItem('userId');
      console.log(storedUid)
      const userId = storedUid ? JSON.parse(storedUid) : null;
      //   const uid = storedUid?.replace(/['"]/g, '')?.trim();
      console.log(userId, user?.userName, user?.email, user?.primaryNumber, orderId, totalAmount, 'uid')
      const response = await initiateOrder({
        customerName: 'Guest',
        customerEmail: 'guest@gmail.com',
        customerPhone: '9999999999',
        orderId: orderId,
        userId: userId,
        totalAmount: totalAmount
      });
      console.log(response, 'createOrders');
      return response.data;
    } catch (err) {
      console.log(err, 'createOrderError');
      ToastAndroid.showWithGravity('Failed to create order. Please try again.', ToastAndroid.LONG, ToastAndroid.CENTER);
      return null;
    }
  };


  const handleClose = () => {
    setShow(false)
    onSuccess()
  };
  const verifyPayment = async (orderID: string) => {
    try {
      let res = await paymentVerify({ orderId: orderID })
      console.log(res.data, 'verifypayment')
      if (res.data) {
        dispatch(setClearCart())
        dispatch(setShowQuantityReset(''))
        setShow(true)
      }

    } catch (error: any) {
      console.log(error, 'verifyError')
    }
  };

  const startCheckout = async (orderId: string) => {
    try {
      console.log(orderId, 'orderData1')
      const orderData = await initOrder(orderId);
      console.log(orderData, 'orderData')
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

  const getSession = (orderData: any) => {
    return new CFSession(
      orderData?.payment_session_id,
      orderData?.order_id,
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

  useEffect(()=>{
    if(totalAmount!==0 && type!=='' && addressId!=='' && orderId!=='' ){
      console.log('waswasw')
      createOrder();
    }
  },[totalAmount,addressId])

  return (
    <>
        {show && <OrderConfirmationScreen show={show} handleClose={handleClose} totalAmount={totalAmount} orderId={orderId} type='makePayment'/>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME_COLORS.secondary,
    color: THEME_COLORS.primary,
    width: 110,
    textAlign: "center",
    padding: 5,
    borderRadius: 5,
    marginRight: '8%',
    marginTop: '4%',
    height: 30
  },
  disableContainer: {
    backgroundColor: THEME_COLORS.light_color,
    color: THEME_COLORS.primary,
    width: 110,
    textAlign: "center",
    padding: 5,
    borderRadius: 5,
    marginRight: '8%',
    marginTop: '4%',
    height: 30
  },

  text: {
    width: 110,
    textAlign: "center",
    paddingRight: 10,
    color: THEME_COLORS.primary
  },
});

export default MakePayment;