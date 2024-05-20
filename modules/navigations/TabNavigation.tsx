import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../Dashboard/components/HomePage";
import Categories from "../Dashboard/components/Categories";
import { AccountIcon, CategoriesIcon, HomeIcon, PercentageIcon, SearchIcon } from "../assets/svgimages/SvgIcons";
import Percentage from "../Dashboard/components/Percentage";
import Search from "../Dashboard/components/Search";
import Account from "../Account/Components/Account";
import { THEME_COLORS } from '../GlobalStyles/GlobalStyles';

export const TabNav = () => {
    const Tab = createBottomTabNavigator();
  
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: { width: 100 },
          tabBarActiveTintColor: `${THEME_COLORS.secondary}`,
          tabBarStyle: { height: 60 },
          tabBarInactiveTintColor: 'black'
        }}
      >
        <Tab.Screen name="home"
          component={HomePage}
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <HomeIcon color={color} />
            ),
          }} />
  
        <Tab.Screen name='categories'
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
          }} />
        <Tab.Screen name="account"
          component={Account}
          options={{
            title: 'Account',
  
            tabBarIcon: ({ color, size }) => (
              <AccountIcon color={color} />
            ),
            headerShown: false,
          }}
        />
  
  
      </Tab.Navigator>
    )
  }