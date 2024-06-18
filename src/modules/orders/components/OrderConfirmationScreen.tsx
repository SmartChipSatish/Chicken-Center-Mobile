import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Button, Image, Modal } from 'react-native';
import { TEXT_COLORS, THEME_COLORS } from '../../../globalStyle/GlobalStyles';
const tick = require('../../../assets/Images/tick.png');
const OrderConfirmationScreen = ({ show, handleClose,totalAmount,orderId,type }: any) => {
  const navigation = useNavigation<any>();
  return (
    <Modal
      transparent={true}
      visible={show}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Order Confirmation</Text>
        </View>
        <View style={styles.content}>
          <Image
            source={tick}
            style={styles.checkmark}
          />
          <Text style={styles.orderPlacedText}>Order Placed Successfully</Text>
          <View style={styles.textRows}>
            <Text style={styles.AlltextColors}>Order ID : </Text>
            <Text style={styles.orderDetailText}>#{orderId.slice(-4)}</Text>
          </View>
          <View style={styles.textRows}>
            <Text style={styles.AlltextColors}>Order Amount : </Text>
            <Text style={styles.orderDetailText}>₹ {totalAmount}</Text>
          </View>

          <Button
            title={type ==='makePayment'? "Close" :"Go To Orders"}
            onPress={() => type ==='makePayment'? handleClose(): navigation.navigate('orders')}
            color={THEME_COLORS.secondary}
            
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  header: {
    width: '80%',
    backgroundColor: THEME_COLORS.secondary,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    width: '80%'
  },
  checkmark: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  orderPlacedText: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderDetailText: {
    fontSize: 16,
    marginBottom: 5,
    color: TEXT_COLORS.primary,
    textTransform:'uppercase',

  },
  emailText: {
    fontSize: 14,
    color: 'grey',
    textAlign: 'center',
    marginTop: 20
  },
  AlltextColors: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  textRows: {
    flexDirection: 'row',
    width:'60%',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:'2%'
  }
});

export default OrderConfirmationScreen;