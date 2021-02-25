import firebase from "firebase/app";
import "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAbSCiUVStNY3-oQSvHCIk_aWv3g1UINRw",
    authDomain: "cayman-7de07.firebaseapp.com",
    projectId: "cayman-7de07",
    storageBucket: "cayman-7de07.appspot.com",
    messagingSenderId: "806093160268",
    appId: "1:806093160268:web:991b49e65bc5798eb259e9",
    measurementId: "G-G1VDB0HVMW"
};
firebase.initializeApp(firebaseConfig);
// Initialize Firebase
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()