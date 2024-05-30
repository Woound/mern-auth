// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-auth-21a04.firebaseapp.com',
  projectId: 'mern-auth-21a04',
  storageBucket: 'mern-auth-21a04.appspot.com',
  messagingSenderId: '1000618637797',
  appId: '1:1000618637797:web:ddcf3fd45b4d06dfb3570c',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
