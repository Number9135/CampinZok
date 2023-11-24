import Checkbox from "expo-checkbox";
import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { auth } from "../../../firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen() {

    const [inputValue, setInputValue] = useState({
        isEmail: '',
        isPassword: '',
        isFocus: null,
        isCheck: false,
        isMsg : null,
    })

    const handleInputValue = (name, value) => {
        setInputValue({...inputValue, [name]:value})
    }

    const loginHandler = async () => {
        try{
        await auth
          .signInWithEmailAndPassword(inputValue.isEmail, inputValue.isPassword)
          .then((userCredential) => {
            const user = userCredential.user;
            user.getIdToken().then((token) => {
              AsyncStorage.setItem('userToken', token)
              .then(() => {
                console.log('User token saved to AsyncStorage');
                if (isCheck) {
                  AsyncStorage.setItem('autoLogin', 'true');
                } else {
                  AsyncStorage.removeItem('autoLogin');
                }
                navigation.navigate('메인페이지');
              });
            });
          })
        }catch{
            handleInputValue("isMsg", "loginErr")
        }

      };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Image style={styles.imgStyle} source={require('../../../assets/loginImg.jpg')} />
                <View style={styles.loginContainer}>
                    {
                        inputValue.isMsg === 'loginErr' && (
                            <Text style={{fontSize:wp('3.5%'), color:'red'}}>계정을 다시 확인 해 주십시오.</Text>
                        )
                    }
                    <TextInput
                        style={[styles.inputStyle, inputValue.isFocus === "email" && styles.focusStyle]}
                        value={inputValue.isEmail}
                        onFocus={() => handleInputValue("isFocus", "email")}
                        onBlur={() => handleInputValue("isFocus", null)}
                        onChangeText={(text) => handleInputValue("isEmail", text)}
                        keyboardType="email"
                        placeholder="Email"
                    />
                    <TextInput
                        style={[styles.inputStyle, inputValue.isFocus === "password" && styles.focusStyle]}
                        onFocus={() => handleInputValue("isFocus", "password")}
                        onBlur={() => handleInputValue("isFocus", null)}
                        placeholder="Password"
                        value={inputValue.isPassword}
                        onChangeText={(text) => handleInputValue("isPassword", text)}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.checkContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={inputValue.isCheck}
                            onValueChange={() => handleInputValue("isCheck", !inputValue.isCheck)}
                            color={inputValue.isCheck ? 'darkgray' : undefined}
                        />
                        <Text style={styles.autoLoginText}>자동 로그인</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.loginButtonStyle}>
                        <Text style={styles.buttonText}>로그인</Text>
                    </TouchableOpacity>
                    <View style={styles.signUpContainer}>
                        <Text style={styles.autoLoginText}>아직 회원이 아니신가요?</Text>
                        <TouchableOpacity>
                            <Text style={[styles.autoLoginText, { color: 'blue', paddingLeft: 10, }]}>회원가입</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems : 'center'
    },

    imgStyle : {
        height : hp('30%'),
        width : wp('100%'),
        borderBottomLeftRadius : 20,
        borderBottomRightRadius : 20,
    },

    loginContainer : {
        height : hp('20%'),
        width : wp('95%'),
        marginTop : 20,
        alignItems : 'center',
        justifyContent : 'space-around'
    },

    inputStyle : {
        borderWidth : 1,
        borderColor : 'darkgray',
        paddingLeft : 10,
        borderRadius : 5,
        height : hp('7%'),
        width : wp('90%'),
        backgroundColor : 'white',
        fontSize : wp('4%')
    },

    focusStyle : {
        backgroundColor : 'white',
        elevation : 10,
        height : hp('8%'),
        width : wp('95%'),
    },

    buttonContainer : {
        height : hp('25%'),
        width : wp('95%'),
        alignItems : 'center'
    },

    loginButtonStyle : {
        height : hp('6%'),
        width : wp('90%'),
        borderRadius : 15,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : 'yellow',
        opacity: 0.8,
        elevation : 5,
        marginVertical : 10,
    },

    buttonText : {
        fontSize : wp('5%')
    },

    checkContainer : {
        height : hp('7%'),
        width : wp('95%'),
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center'
    },

    autoLoginText : {
        fontSize : wp('4%'),
        paddingLeft : 10,
    },

    signUpContainer : {
        height : hp('7%'),
        width : wp('95%'),
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row'
    }
})
