// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from 'firebase/auth' //importar servicio de autenticacion

import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth_user = getAuth(app)
const providerGoogle = new GoogleAuthProvider()

// Initialize Firebase
const analytics = getAnalytics(app);

//Crear constante para conexión de BD de firebase
const db= getFirestore(app)

//INDICAR QUE SE UTILIZA EL SERVICIO DE AUTENTICACIÓN CON APP
export {providerGoogle, auth_user, db}