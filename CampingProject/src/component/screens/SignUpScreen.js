import React, { useState } from "react";
import { ImageBackground } from "react-native";
import { ScrollView } from "react-native";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import SignUpEmail from "../forms/SignUpEmail";
import SignUpNickname from "../forms/SignUpNickname";
import SignUpPassword from "../forms/SignUpPassword";


export default function SignUpScreen(){

    const [ isValue , setIsValue ] = useState({
        isEmail : '',
        isPassword : '',
        isNickname : '',
        isComparePw : '',
        isFocus : null,
        msgEmail : false,
        msgPassword : false,
        msgNickname : false,
        masgComparePw : false,
        isMsg : null,
    });

    const handleValue = (name, value) => {
        setIsValue({...isValue, [name] : value})
    };

   

    return (
        <View style={styles.container}>
            <ImageBackground resizeMode="cover"
            style={styles.bgiContainer} source={require('../../../assets/signUpImg.jpg')}>
                <View style={styles.signUpContainer}>
                    <SignUpEmail isValue={isValue} handleValue={handleValue}/>
                    <SignUpNickname isValue={isValue} handleValue={handleValue}/>
                    <SignUpPassword isValue={isValue} handleValue={handleValue}/>

                </View>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.submitButtonStyle}>
                    <Text>회원가입</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center'
    },

    signUpContainer : {
        height : hp('65%'),
        width : wp('97%'),
        backgroundColor : "white",
        borderBottomLeftRadius : 30,
        borderBottomRightRadius : 30,
        elevation : 10,
        opacity : 0.9,

    },

    submitButtonStyle : {

        height : hp('7%'),
        width : wp('30%'),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 5,
        backgroundColor : "lavenderblush",
        elevation : 10,
        bottom : 25,
    },

    bgiContainer : {
        height : hp('85%'),
        width : wp('100%'),
        alignItems : 'center'
    }
})