// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBctUTP9BJwa59FvQZWTeGc6I7Z8ThuQtQ",
    authDomain: "mikufan-57f29.firebaseapp.com",
    databaseURL: "https://mikufan-57f29-default-rtdb.firebaseio.com",
    projectId: "mikufan-57f29",
    storageBucket: "mikufan-57f29.firebasestorage.app",
    messagingSenderId: "784213993527",
    appId: "1:784213993527:web:b6e48a0710ccdef0e4b7b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

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
        const result = await signInWithPopup(auth, googleProvider);
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