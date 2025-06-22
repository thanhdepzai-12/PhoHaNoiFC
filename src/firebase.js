import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDVtMVpXDPNUq6HKnkUAlsSdqDqDdThWOA",
  authDomain: "phohn-f72a9.firebaseapp.com",
  databaseURL: "https://phohn-f72a9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "phohn-f72a9",
  messagingSenderId: "1015154881013",
  appId: "1:1015154881013:web:5c89f5229b8feda65170bc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);