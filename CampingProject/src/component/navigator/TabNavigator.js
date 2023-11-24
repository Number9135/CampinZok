import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigator from './StackNavigator';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import React, {useState} from 'react';
import {View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import MyPage from '../screens/MyPage';

const Tab = createBottomTabNavigator();


function TabNavigator() {
    const loginState = useSelector((state) => state.auth.loginState)


  return (
    <Tab.Navigator
     screenOptions={{
      tabBarHideOnKeyboard : true,
      tabBarStyle :{
        backgroundColor : 'white'
      },
      headerShown : false,
      tabBarActiveTintColor: "black",
      tabBarLabelStyle : {
        fontSize : wp('3%'),
        bottom : 3,
        
      },
     
     }}>


      <Tab.Screen name="홈" component={StackNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Feather name="home" size={wp('4.5%')} color={focused ? "black" : "gray"}/>
          ),
        }} />

{
          loginState ? (
            <Tab.Screen name="마이페이지" component={MyPage}
       options={{
        tabBarIcon : ({ focused, size }) => (
          <Ionicons name="person" size={wp('4.5%')} color={focused ? "black" : "gray"} />
        ),
       }}/>
          ) : (
            <Tab.Screen name="로그인" component={LoginScreen}
            options={{
             tabBarIcon : ({ focused, size }) => (
               <AntDesign name="login" size={wp('4.5%')} color={focused ? "black" : "gray"} />
             ),
            }}/>

          )
        }
        

        
      
    </Tab.Navigator>
  );
}

export default TabNavigator;
