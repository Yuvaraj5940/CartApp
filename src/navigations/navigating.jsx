import { View, Text } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react'
import SignUp from '../screens/signup/Signup';
import Login from '../screens/login/Login';
import Home from '../screens/Home/home';
import Splash from '../screens/splash';
import Menu from '../screens/menu';
import CartItems from '../screens/Cartitem';




const Stack = createStackNavigator();

const Nav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
          name='Login' 
          component={Login}
          options={{header: () => null}}
        />
      <Stack.Screen
          name='home' component={Home} 
          options={{header: () => null}}
        />
      <Stack.Screen
         name='Splash' component={Splash} 
         options={{header: () => null}}
        />
        <Stack.Screen 
          name='Rmenu' 
          component={Menu}
          options={{header: () => null}}
        />
      <Stack.Screen
          name='cart' component={CartItems} 
          options={{title: () => null}}
        />
        <Stack.Screen
         name='SignUp' component={SignUp} 
         options={{header: () => null}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Nav