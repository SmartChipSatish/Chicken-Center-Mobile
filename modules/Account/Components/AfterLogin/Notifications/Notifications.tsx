import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, View } from "react-native";
import { AlertsIcon, OffersIcon } from '../../../../assets/svgimages/AccountsSvgs/accountsSvgs';
import Offers from './Offers';
import Alerts from './Alerts';

function CustomTabBarLabel({ icon, label, focused }:any) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
       {label === 'Offers' &&<OffersIcon  color={focused ? 'red' : 'black'} />}
       {label === 'Alerts' &&<AlertsIcon color={focused ? 'red' : 'black'}/>}
      <Text style={{ marginLeft: 5,color:'black',fontSize:16 }}>{label}</Text>
    </View>
  );
}

export  function Notifications() {
const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: 'black',
      tabBarLabelStyle: { fontSize: 12 },
      tabBarIndicatorStyle:{backgroundColor:'red'},
      
    }}> 
      <Tab.Screen name="offers" component={Offers} 
      options={{
        tabBarLabel: ({focused}) => (
          <CustomTabBarLabel icon="gift-outline" label="Offers" focused={focused} />
        )
      }}
      />
      <Tab.Screen name="alerts" component={Alerts} 
      options={{
        tabBarLabel: ({ focused }) => (
          <CustomTabBarLabel icon="gift-outline" label="Alerts" focused={focused}/>
        )
      }}
      />
    </Tab.Navigator>
  );
}