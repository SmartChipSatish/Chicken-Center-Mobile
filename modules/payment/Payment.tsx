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
import { TEXT_COLORS, THEME_COLORS } from '../GlobalStyles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';

const Payment = ({ totalAmount, type }: { totalAmount: number, type: string }) => {
  const navigate=useNavigation<any>();
  const [order, setOrder] = useState({
    payment_session_id: '',
    order_id: '',
    order_expiry_time: '',
  });
  const [orderId, setOrderId] = useState("");
  const [responseText, setResponseText] = useState('');

  const createOrder = () => {
    return new Promise((resolve, reject) => {
      axios.post('http://192.168.1.13:8000/createOrder', {
        customerName: 'Dheeraj',
        customerEmail: 'dheeraj@gmail.com',
        customerPhone: '+919876543211',
        totalAmount: totalAmount
      })
        .then(response => {
          setOrder(response.data);
          setOrderId(response.data.order_id)
          resolve(response.data);
        })
        .catch(err => reject(err));
    });
  };




  const verifyPayment = async () => {
    try {
      let res = await axios.post("http://192.168.1.13:8000/verify", { orderId: orderId })
      if (res.data) {     
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Payment Verified',
          button: 'close',
        })
    
      }

    } catch (error: any) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failure',
        textBody: error,
        button: 'close',
      })
    }
  }

  const startCheckout = async (e: any) => {
    // e.preventDefault();
    try {
      const session = getSession();
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
    } catch (e) {
    }
  };

  const startUPICheckout = async () => {
    try {
      const session = getSession();
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

  const getSession = () => {
    return new CFSession(
      order.payment_session_id,
      order.order_id,
      CFEnvironment.SANDBOX,
    );
  };


  const updateStatus = (message: string) => {
    setResponseText(message);
    ToastAndroid.showWithGravity(message,  ToastAndroid.LONG,ToastAndroid.CENTER);
  };

  useEffect(() => {
    createOrder();
  }, []);

  useEffect(() => {
    CFPaymentGatewayService.setEventSubscriber({
      onReceivedEvent(eventName: string, map: Map<string, string>): void {
      },
    });
    CFPaymentGatewayService.setCallback({
      onVerify(orderID: string): void {
        verifyPayment()
        navigate.navigate('orders')
        updateStatus(orderID);
      },
      onError(error: CFErrorResponse, orderID: string): void {
        verifyPayment()
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
     
      {type=== 'online' && 
       <View>
      <TouchableOpacity onPress={startCheckout}>
        <Text style={styles.text}>Confirm Order</Text>
      </TouchableOpacity>
      <AlertNotificationRoot>
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       {/* No button needed since the verifyPayment is triggered by the useEffect */}
     </View>
   </AlertNotificationRoot>
      </View>
      }
      {type=== 'upi' && 
      <View>
      <TouchableOpacity onPress={startUPICheckout}>
        <Text style={styles.text}>Confirm Order</Text>
      </TouchableOpacity>
      <AlertNotificationRoot>
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       {/* No button needed since the verifyPayment is triggered by the useEffect */}
     </View>
   </AlertNotificationRoot>
      </View>
      }
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