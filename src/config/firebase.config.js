import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyARicGjmfhTPYEkgA6b3lJcae4aGnnm9oU",
    authDomain: "reactwitter.firebaseapp.com",
    databaseURL: "https://reactwitter.firebaseio.com",
    projectId: "reactwitter",
    storageBucket: "reactwitter.appspot.com",
    messagingSenderId: "24379001386",
    appId: "1:24379001386:web:e816d56249148f731bd153"
  };

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();
export const auth = fb.auth();
export const storage = fb.storage();