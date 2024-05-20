import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert } from "react-native";
import AllTransactions from './AllTransactions';
import Credited from './Credited';
import Debited from './Debited';

const Tab = createMaterialTopTabNavigator();

export function TransactionHistory() {

    const phoneNumber = '1234567890';
    const makeCall = () => {
        Linking.openURL(`tel:${phoneNumber}`)
      };

  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIndicatorStyle: { backgroundColor: 'red' },
      }}>
        <Tab.Screen name="all" component={AllTransactions}
          options={{
            tabBarLabel: () => <Text style={styles.title}>All</Text>
          }}
        />
        <Tab.Screen name="credited" component={Credited}
          options={{
            tabBarLabel: () => <Text style={styles.title}>Credited</Text>
          }}
        />
        <Tab.Screen name="debited" component={Debited}
          options={{
            tabBarLabel: () => <Text style={styles.title}>Debited</Text>
          }}
        />
      </Tab.Navigator>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => makeCall()}>
          <Text style={styles.buttonText}>Have any issue? Call us </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    color: 'black',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
