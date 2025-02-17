import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

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

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in:', userCredential.user);
        } catch (error) {
            setError('Error signing in: ' + (error as Error).message);
            console.error('Error signing in:', error);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('User signed in with Google:', user);
        } catch (error) {
            setError('Error signing in with Google: ' + (error as Error).message);
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSignIn}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Sign In</button>
            </form>
            <button onClick={handleGoogleSignIn}>Sign In with Google</button>
        </div>
    );
};

export default SignIn; 