import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBulvgAhKb_h0HIW1O5J5t0VzwVKPHVIiQ",
  authDomain: "minha-vaga-e8ab2.firebaseapp.com",
  projectId: "minha-vaga-e8ab2",
  storageBucket: "minha-vaga-e8ab2.firebasestorage.app",
  messagingSenderId: "123218304272",
  appId: "1:123218304272:web:5216a4bbced338f5b1d995"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

if (process.env.NODE_ENV === 'development') {
  // Uncomment these lines if you want to use emulators in development
  // connectAuthEmulator(auth, "http://localhost:9099");
  // connectFirestoreEmulator(db, 'localhost', 8080);
}

export default app; 