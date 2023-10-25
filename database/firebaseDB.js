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
  apiKey: "AIzaSyBkVoPorfLqJ78o2615fwkY05ixVcgxeVw",
  authDomain: "mobile-lab10-eb46b.firebaseapp.com",
  projectId: "mobile-lab10-eb46b",
  storageBucket: "mobile-lab10-eb46b.appspot.com",
  messagingSenderId: "191540488435",
  appId: "1:191540488435:web:d0c1674f48a0a7c7676f86",
  measurementId: "G-04JG1LR2PX"
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