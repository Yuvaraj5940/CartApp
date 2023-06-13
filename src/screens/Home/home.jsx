import { View, Text,Image } from 'react-native'
import React,{useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dishes from '../dishes';
import Profile from '../Profile';

const Tab = createBottomTabNavigator();

const Home = ({navigation}) => {
  
    
  return (
    <Tab.Navigator
     screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'dishes') {
            iconName = focused
              ? require('../../asets/images/dishes.png')
              : require('../../asets/images/dish.png');
          } else if (route.name === 'profile') {
            iconName = focused ? require('../../asets/images/profile.png'): require('../../asets/images/user.png');
          }
          return <Image source={iconName} style={{width:30,height:30}} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
>
        <Tab.Screen name='dishes' component={Dishes}         
            options={{header: () => null}}
        />
        <Tab.Screen name='profile' component={Profile} 
            options={{header: () => null}}
        />
    </Tab.Navigator>
  )
}

export default Home