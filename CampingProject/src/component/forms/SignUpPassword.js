import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { firebase_db } from "../../../firebaseConfig";

export default function SignUpPassword({handleValue, isValue}){
  
   useEffect(()=>{
    const pwRegex = new RegExp('^[a-z0-9*!]{6,}$|^$');
    if(isValue.isPassword.match(pwRegex)){
        handleValue('isMsg', 'possiblePw')
    }else{
        handleValue('isMsg', 'impossiblePw')
    }
   }, [isValue.isPassword])

    return(
        <View style={styles.container}>
                <TextInput
                    style={[styles.inputStyle, isValue.isFocus === 'password' && styles.inputFocus]}
                    value={isValue.isPassword}
                    onChangeText={(text) => handleValue('isPassword', text)}
                    onFocus={() => handleValue('isFocus', 'password')}
                    onBlur={() => handleValue('isFocus', null)}
                />

            {
                handleValue.isMsg === 'possibleEmail' && (
                    <Text style={{fontSize:wp('3.5%')}}>사용 가능합니다.</Text>
                )
            }
            {
                handleValue.isMsg === 'impossibleEmail' && (
                    <Text style={{fontSize:wp('3.5%'), color:'red'}}>잘못된 형식입니다.(영문, 숫자, 특수문자(*, !) 조합 6자리 이상)</Text>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        borderWidth : 1,
        height : hp('10%'),
        width : wp('100%'),
        justifyContent : 'center',
        alignItems : 'center'
    },

    inputStyle : {
        borderWidth : 1,
        height : hp('6%'),
        width : wp('80%'),
        paddingLeft : 10,
        fontSize : wp('4%'),
        borderRadius : 5,
    },

    inputFocus : {
        borderWidth : 1,
        height : hp('7%'),
        width : wp('85%'),
        paddingLeft : 10,
        fontSize : wp('4.5%'),
        borderRadius : 5,
        elevation : 5,
        backgroundColor : "ghostwhite"
    },

    inputContainer : {
        borderWidth : 1,
        height : hp('7%'),
        width : wp('90%'),
        justifyContent : 'space-around',
        alignItems : 'center',
        flexDirection : 'row',
    },

    duplicationButtonStyle : {
        borderWidth : 1,
        height : hp('5%'),
        width : wp('20%'),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 5,
    },

    textFont : {
        fontSize : wp('4%')
    }
})