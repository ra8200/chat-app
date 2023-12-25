
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
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

initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

const auth = getAuth(app);

const db = getFirestore(app);

export { db, auth };