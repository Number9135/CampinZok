import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { firebase_db } from "../../../firebaseConfig";

export default function SignUpNickname({handleValue, isValue}){

  
    const duplicationButton = async(nickname) => {
        const nicknameRegex = new RegExp('^[가-힣a-zA-Z0-9]+$')
        try{
            await firebase_db.ref('users').orderByChild('profile/UserName')
            .equalTo(nickname)
            .once('value')
            .then((snapshot) => {
                if(nickname.match(nicknameRegex)){
                    if(!snapshot.exists()){
                        handleValue('isMsg', 'possibleNick')
                        handleValue('msgNickname', true)
                    }else{
                        handleValue('isMsg', 'impossibleNick')
                    }
                }else{
                    handleValue('isMsg', 'wrongNick')
                }
            })
        }catch{
            handleValue('isMsg', 'errNick')
        }
    }


    return(
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.inputStyle, isValue.isFocus === 'nickname' && styles.inputFocus]}
                    value={isValue.isNickname}
                    onChangeText={(text) => handleValue('isNickname', text)}
                    onFocus={() => handleValue('isFocus', 'nickname')}
                    onBlur={() => handleValue('isFocus', null)}
                />
                <TouchableOpacity onPress={()=>duplicationButton(isValue.isNickname)}
                style={styles.duplicationButtonStyle}>
                    <Text style={styles.textFont}>중복확인</Text>
                </TouchableOpacity>
            </View>
            {
                isValue.isMsg === 'errNick' && (
                    <Text style={{fontSize:wp('3.5%'), color:'blue'}}>오류! 잠시 후 시도해 주십시오.</Text>
                )
            }
            {
                 isValue.isMsg === 'possibleNick' && (
                    <Text style={{fontSize:wp('3.5%')}}>사용 가능합니다.</Text>
                )
            }
            {
                 isValue.isMsg === 'impossibleNick' && (
                    <Text style={{fontSize:wp('3.5%'), color:'red'}}>이미 존재하는 닉네임입니다.</Text>
                )
            }
            {
                isValue.isMsg === 'wrongNick' && (
                    <Text style={{fontSize:wp('3.5%'), color:'blue'}}>잘못된 닉네임 형식입니다.</Text>
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
        width : wp('60%'),
        paddingLeft : 10,
        fontSize : wp('4%'),
        borderRadius : 5,
    },

    inputFocus : {
        borderWidth : 1,
        height : hp('7%'),
        width : wp('65%'),
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