import React, { useEffect } from "react";
import { auth, firebase_db } from '../../../firebaseConfig';


const AuthState = () => {

    useEffect(()=>{
        auth.onAuthStateChanged((user) => {
            if(user){
                firebase_db.ref()
            }
        })
    })
    

}