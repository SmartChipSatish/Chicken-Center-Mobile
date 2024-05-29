import React from 'react';
import { View, Text, StyleSheet, Button, Image, Modal } from 'react-native';

const OrderConfirmationScreen = ({show, handleClose}) => {
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
          source={{ uri: 'https://via.placeholder.com/100?text=%E2%9C%94' }} // Placeholder for the checkmark image
          style={styles.checkmark}
        />
        <Text style={styles.orderPlacedText}>Order Placed Successfully</Text>
        <Text style={styles.orderDetailText}>Order ID: r2qhwfnrjnlgvq4</Text>
        <Text style={styles.orderDetailText}>Order Amount: ₹932.20</Text>
        <Text style={styles.emailText}>
          A Confirmation email has been sent to
        </Text>
        <Text style={styles.emailText}>subumani@gmail.com</Text>
        <Button
          title="Go To Orders"
          // onPress={() => navigation.navigate('Orders')} // Adjust navigation to your app's structure
          color="#ff0000"
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
    backgroundColor: '#ff0000',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
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
  },
  emailText: {
    fontSize: 14,
    color: 'grey',
    textAlign: 'center',
  },
});

export default OrderConfirmationScreen;
