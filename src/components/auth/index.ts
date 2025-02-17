import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Your web app's Firebase configuration
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
const auth = getAuth(app);

// Example function to handle sign-in
const handleSignIn = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCredential.user);
    } catch (error) {
        console.error('Error signing in:', error);
    }
};

// Export the function for use in your components
export { handleSignIn };

export { default as Login } from './Login';
export { default as Register } from './Register';
export { default as SocialAuth } from './SocialAuth';
export { ProtectedRoute } from './ProtectedRoute'; 