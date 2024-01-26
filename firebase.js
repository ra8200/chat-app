import { initializeApp } from 'firebase/app';
import {
    getAuth,
    setPersistence,
    browserSessionPersistence,
    initializeAuth,
    getReactNativePersistence,  
 } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyA2yd_XXz84BXJqV_oceQn8aTUQ2wWAZC8",
    authDomain: "chat-app-cdb60.firebaseapp.com",
    projectId: "chat-app-cdb60",
    storageBucket: "chat-app-cdb60.appspot.com",
    messagingSenderId: "223265773553",
    appId: "1:223265773553:web:dfc34f47f6ddefac65d650"
};

const app = initializeApp(firebaseConfig);
let auth;

if (typeof document !== 'undefined') {
    // Web environment
    auth = getAuth(app);
    setPersistence(auth, browserSessionPersistence);
} else {
    // React Native environment
    const reactNativePersistence = getReactNativePersistence;
    auth = initializeAuth(app, {
      persistence: reactNativePersistence(AsyncStorage)
    });
}

// if (typeof document !== 'undefined') {
//     // Web environment
//     auth = firebaseAuth.getAuth(app);
//     firebaseAuth.setPersistence(auth, firebaseAuth.browserSessionPersistence);
// } else {
//     // React Native environment
//     const reactNativePersistence = firebaseAuth.getReactNativePersistence;
//     auth = firebaseAuth.initializeAuth(app, {
//       persistence: reactNativePersistence(AsyncStorage)
//     });
// }

const db = getFirestore(app);

// Exporting the necessary Firebase services and functions
export { db, auth };