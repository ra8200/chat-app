import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserSessionPersistence, inMemoryPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

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

// Set persistence based on the platform
if (typeof document !== 'undefined') {
    // Web environment
    auth = getAuth(app);
    setPersistence(auth, browserSessionPersistence);
} else {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
}

const db = getFirestore(app);

export { db, auth };