import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDgqh1lmUokHroJhdthI_SFy-oDO85qpqg",
    authDomain: "footballclubwebsite.firebaseapp.com",
    projectId: "footballclubwebsite",
    storageBucket: "footballclubwebsite.firebasestorage.app",
    messagingSenderId: "269674941643",
    appId: "1:269674941643:web:7cddee0eacf9560e2c1f4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; 