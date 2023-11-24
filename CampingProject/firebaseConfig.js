import firebase from "firebase/compat/app"; // 사용할 파이어베이스 서비스 주석을 해제합니다 //
import "firebase/compat/auth";
import "firebase/compat/database"; //
import "firebase/compat/firestore"; //
import "firebase/compat/functions";
import "firebase/compat/storage"; // Initialize Firebase //파이어베이스 사이트에서 봤던 연결정보를 여기에 가져옵니다

//사용 방법입니다.
//파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드로 알아두면 됩니다.

// if (!firebase.apps.length) {
//   firebase.initializeApp();
// }

firebase.initializeApp({
    apiKey: "AIzaSyA_Mm6343oEougU_2NIvKMMDMADZFBQsLA",
    authDomain: "camping-3faa2.firebaseapp.com",
    databaseURL: "https://camping-3faa2-default-rtdb.firebaseio.com",
    projectId: "camping-3faa2",
    storageBucket: "camping-3faa2.appspot.com",
    messagingSenderId: "24225130289",
    appId: "1:24225130289:web:79083e2ba393729e6e7210",
    measurementId: "G-FE2LFTERSK"
    
})

// export const firebase_db = firebase.database();

export const auth = firebase.auth();
export const firebase_db = firebase.database()