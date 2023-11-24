import React from "react";
import { createDrawerNavigator, DrawerToggleButton } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import { Image, View, StyleSheet, Text } from "react-native";
import MainScreen from "../main/MainScreen";
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import DrawerContent from "../forms/DrawerContents";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const navigation = useNavigation();
  const logo = {
    uri : require('../../../assets/logo.png')
}

  return (
    <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props}/>}
        screenOptions={{
          headerStyle : {backgroundColor : 'white'},
        headerLeft: false,
        headerRight: () => <DrawerToggleButton />,
        drawerPosition: 'right',
        headerShown: true,
        height: hp('11%'),
        headerTitle: (props) => (
          <View style={styles.logoContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('메인페이지')}
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={styles.logoStyle} resizeMode='cover' source={logo.uri} />
              <Text style={styles.logoText}>캠핑족</Text>
            </TouchableOpacity>
          </View>
        )
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={TabNavigator} options={{drawerLabel: 'HOME',}} />
      {/* <Drawer.Screen name="About" component={MainScreen} options={{drawerLabel: 'ABOUT'}} /> */}
    </Drawer.Navigator>
   
  );
}

const styles = StyleSheet.create({
  logoStyle : {
      height:hp('10%'), 
      width:wp('13%'),
      borderRadius : 10,
  },

  headerStyleContainer : {
      flexDirection : 'row',
      justifyContent : 'space-between'
  },

  logoContainer : {
    width : wp('30%'),
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'flex-start',

  },

  logoText : {
    fontSize : wp('4%'),
    marginLeft : 10,
  }

});

export default DrawerNavigator;