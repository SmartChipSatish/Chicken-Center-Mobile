import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../Dashboard/components/HomePage";
import Categories from "../Dashboard/components/Categories";
import { AccountIcon, CartIcon, CategoriesIcon, HomeIcon, OrdersIcon, PercentageIcon, SearchIcon } from "../assets/svgimages/SvgIcons";
import Percentage from "../Dashboard/components/Percentage";
import Search from "../Dashboard/components/Search";
import Account from "../Account/Components/Account";
import { TEXT_COLORS, THEME_COLORS } from '../GlobalStyles/GlobalStyles';
import Cart from '../Dashboard/components/Cart';
import Orders from '../Dashboard/components/Orders';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

// const CartIcons = (itemCount:number,color:string ) => {
//     return (
//         <View style={styles.container}>
//             <CartIcon  color={} />
//             {itemCount > 0 && (
//                 <View style={styles.badge}>
//                     <Text style={styles.badgeText}>{itemCount}</Text>
//                 </View>
//             )}
//         </View>
//     );
// };

function CustomTabBarLabel({ label, color }:any) {
    return (
      <View style={{  alignItems: 'center',justifyContent:'center' }}>
        {label ==='Home' &&<HomeIcon  color={color} />}
        {/* {label ==='Cart' &&<View><CartIcon/><Text style={{position:'absolute',right:-10,top:-5,zIndex:99999}}>1</Text></View>} */}
        {label === 'Cart' && <CartIcon color={color}/>}
        {label ==='Orders' &&<OrdersIcon  color={color} />}
        {label ==='Account' &&<AccountIcon color={color} />}
        <Text style={{color:`${color}`,fontSize:13 }}>{label}</Text>
      </View>
    );
  }

export const TabNav = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel:false,
                tabBarActiveTintColor: `${THEME_COLORS.secondary}`,
                tabBarStyle: { height: 60 },
                tabBarInactiveTintColor: `${TEXT_COLORS.secondary}`
            }}
        >
            <Tab.Screen name="home"
                component={HomePage}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <CustomTabBarLabel label={'Home'} color={color}/>
                    ),
                }} />

            {/* <Tab.Screen name='categories'
          component={Categories}
          options={{
            title: 'Categories',
            tabBarIcon: ({ color, size }) => (
              <CategoriesIcon color={color} />
            )
          }} />
        <Tab.Screen name='offers'
          component={Percentage}
          options={{
            title: "",
            tabBarIcon: () => (
              <PercentageIcon />
            ),
            headerTitleStyle: { display: 'none' }
            // headerShown:false
          }} />
        <Tab.Screen name='search'
          component={Search}
          options={{
            title: 'Search',
            tabBarIcon: ({ color }) => (
              <SearchIcon color={color} />
            )
          }} /> */}
            <Tab.Screen name='cart'
                component={Cart}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <CustomTabBarLabel label={'Cart'} color={color}/>
                    ),
                }} />
            <Tab.Screen name='orders'
                component={Orders}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <CustomTabBarLabel label={'Orders'} color={color}/>
                    ),
                }} />
            <Tab.Screen name="account"
                component={Account}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <CustomTabBarLabel label={'Account'} color={color}/>
                    ),
                    headerShown: false,
                }}
            />


        </Tab.Navigator>
    )
}
