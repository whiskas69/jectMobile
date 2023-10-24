// Import the functions you need from the SDKs you need
import * as firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'; 
import { getStorage } from 'firebase/storage'; 

import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB5AsIatsXXUuacmjM3yZs8QJL9-rGRIuw",
//   authDomain: "rubhiw-8f5b8.firebaseapp.com",
//   projectId: "rubhiw-8f5b8",
//   storageBucket: "rubhiw-8f5b8.appspot.com",
//   messagingSenderId: "1088284540539",
//   appId: "1:1088284540539:web:9de36fa1efcaefe6102cde",
//   measurementId: "G-885TL08S9B"
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyCVK7eajv8JheNbTdeIwSn6Jvcy28YirPI",
//   authDomain: "mobile66-ch10-d3279.firebaseapp.com",
//   projectId: "mobile66-ch10-d3279",
//   storageBucket: "mobile66-ch10-d3279.appspot.com",
//   messagingSenderId: "355604398548",
//   appId: "1:355604398548:web:183957083c0b6e4e365641",
//   measurementId: "G-B5K39XY2WK"
// }


// const firebaseConfig = {
//   apiKey: "AIzaSyAntBvPrT4awK1npBI6MTP_SgqLlklp9AM",
//   authDomain: "register-4c2f6.firebaseapp.com",
//   projectId: "register-4c2f6",
//   storageBucket: "register-4c2f6.appspot.com",
//   messagingSenderId: "941507859358",
//   appId: "1:941507859358:web:fc7396bb6714af63fcbc8f",
//   measurementId: "G-LFFENYB9NY"
// };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArM80IOVKPeBib04P4_JH97G3i4EGSeC8",
  authDomain: "project-gastronome.firebaseapp.com",
  projectId: "project-gastronome",
  storageBucket: "project-gastronome.appspot.com",
  messagingSenderId: "804981356233",
  appId: "1:804981356233:web:7a20f787d6685a568fbf18"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}
export const auth1 = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const auth = firebase.auth()
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firebase, firestore, storage };