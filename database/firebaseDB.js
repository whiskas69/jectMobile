// Import the functions you need from the SDKs you need
import * as firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'; 
import { getStorage } from 'firebase/storage'; 

import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

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