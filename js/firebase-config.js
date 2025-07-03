// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: window.FIREBASE_API_KEY || '',
    authDomain: window.FIREBASE_AUTH_DOMAIN || '',
    projectId: window.FIREBASE_PROJECT_ID || '',
    storageBucket: window.FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: window.FIREBASE_MESSAGING_SENDER_ID || '',
    appId: window.FIREBASE_APP_ID || ''
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, provider, signInWithPopup };

export async function signIn(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = 'index.html';
        return { success: true };
    } catch (error) {
        console.error('Erro no login:', error);
        return { 
            success: false, 
            error: error.code === 'auth/wrong-password' ? 'Senha incorreta.' : 'Erro ao fazer login. Tente novamente.' 
        };
    }
}

export async function signUp(email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        window.location.href = 'index.html';
        return { success: true };
    } catch (error) {
        console.error('Erro no registro:', error);
        return { 
            success: false, 
            error: error.code === 'auth/email-already-in-use' ? 'Este email já está em uso.' : 'Erro ao criar conta. Tente novamente.' 
        };
    }
}

export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        if (result.user) {
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Erro no login com Google:', error);
        throw error;
    }
}

export async function logOut() {
    try {
        await signOut(auth);
        window.location.href = 'login.html';
        return { success: true };
    } catch (error) {
        console.error('Erro no logout:', error);
        return { success: false, error: 'Erro ao fazer logout. Tente novamente.' };
    }
} 