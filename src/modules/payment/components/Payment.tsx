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
import { setResetQuantity, setShowQuantityReset } from '../../home/store/slices/ProductsListSlice';
import { ShowToster } from '../../../sharedFolders/components/ShowToster';
import { useToast } from 'react-native-toast-notifications';

interface paymentDetails{ 
  totalAmount: number, 
  type: string, 
  addressId: string,
  repeatOrderData:any ,
  setLoding:(status:boolean)=>void
}

const Payment = ({ totalAmount, type, addressId,repeatOrderData, setLoding }: paymentDetails) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store: RootState) => store.cartProducts.cartProducts);
  const totalQuantity = cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0);
  const [summaryOrderId, setSummaryOrderId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const toast = useToast();
  const [createData] = useCreateOrderMutation();
  const [initiateOrder] = useInitiateOrderMutation();
  const [paymentVerify] = useVerifyOrderMutation();

  const items = cartItems.map(item => {
    return ({
      itemId: item.id,
      itemQty: item.itemQty,
      itemPrice: item.itemPrice,
      amount: item.total,
      imageUrl: item.imageUrl,
      itemName: item.itemName,
      itemUnit:item?.quantity,
      contactNumber:'9948917262'
    })
  });
  const createOrder = async () => {
    if (addressId !== '') {
      setIsLoading(true)
      try {
        const storedUid = await AsyncStorage.getItem('userId');
        const uid = storedUid?.replace(/['"]/g, '').trim();
        const response = await createData({
          userId: uid,
          createdBy: uid,
          updatedBy: uid,
          addressId: addressId,
          paymentType: type,
          items: repeatOrderData !== undefined ? repeatOrderData?.items : items,
          totals: repeatOrderData !== undefined ? repeatOrderData?.totals : {
            quantity: totalQuantity,
            amount: totalAmount
          }
        }).unwrap();
        setLoding(true);
        setSummaryOrderId(response._id)
        const orderId = response._id;
        if (response && orderId) {
          if (type === 'online') {
            startCheckout(orderId)
          } else if (type === 'upi') {
            startUPICheckout(orderId)
          }
          setTimeout(() => { setIsLoading(false); }, 2000);
        } else {
          updateStatus('OrderId Not Found')
          setTimeout(() => { setIsLoading(false); }, 1000);
        }
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    } else {
      // Alert.alert('Select Address and Payment type');
      ShowToster(toast, 'Select Address and Payment type', '', 'error');
    }
  };

  const initOrder = async (orderId: string) => {
    try {
      const storedUid = await AsyncStorage.getItem('userId');
      const uid = storedUid?.replace(/['"]/g, '').trim();
      const response = await initiateOrder({
        customerName: 'Nasa2',
        customerEmail: 'Nasa2@gmail.com',
        customerPhone: '+919876243167',
        orderId: orderId,
        userId: uid,
        totalAmount: repeatOrderData !== undefined ? repeatOrderData?.totals?.amount : totalAmount
      });
      return response.data;
    } catch (err) {
      ToastAndroid.showWithGravity('Failed to create order. Please try again.', ToastAndroid.LONG, ToastAndroid.CENTER);
      return null;
    }
  };


  const handleClose = () => {
    setShow(false)
  };
  const verifyPayment = async (orderID: string) => {
    try {
      let res = await paymentVerify({ orderId: orderID })
      if (res.data) {
        setLoding(false);
        dispatch(setClearCart())
        dispatch(setShowQuantityReset(''))
        dispatch(setResetQuantity(''));
        setShow(true)
      }

    } catch (error: any) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failure',
        textBody: error,
        button: 'close',
      })
    }
  };

  const startCheckout = async (orderId: string) => {
    try {
      const orderData = await initOrder(orderId);
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
    
    }
  };

  const startUPICheckout = async (orderId: string) => {
    try {
      const orderData = await initOrder(orderId);
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
    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <View style={addressId === '' ? styles.disableContainer : styles.container}>

        <View >
          <TouchableOpacity style={[styles.confirm_order,{backgroundColor:(addressId && type) ? THEME_COLORS.secondary: THEME_COLORS.light_color}]} onPress={isLoading ? () => { } : createOrder} disabled={isLoading}>
          {isLoading && <ActivityIndicator size="small" color={THEME_COLORS.primary} />}
            <Text style={styles.text} disabled={isLoading}>Confirm Order</Text>
          </TouchableOpacity>
          <AlertNotificationRoot>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            </View>
          </AlertNotificationRoot>
        </View>
        {show && <OrderConfirmationScreen show={show} 
                                          handleClose={handleClose} 
                                          totalAmount={repeatOrderData !== undefined ? repeatOrderData?.totals?.amount : totalAmount} 
                                          orderId={summaryOrderId} />}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: THEME_COLORS.secondary,
    height: 45,
    borderRadius: 10,
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
    width: '60%',
  },
  image: {
    width: 200,
    height: 200,
  },
  btn: {
    margin: 20,
    width: '50%',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft:'2%'
  },
  confirm_order: {
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row'
  },
});

export default Payment;