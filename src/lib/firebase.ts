import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC3X_rnkBFYwX_iB2VEBc5g0P6Xiuvln_I",
  authDomain: "pehu-akter-riya.firebaseapp.com",
  databaseURL: "https://pehu-akter-riya-default-rtdb.firebaseio.com",
  projectId: "pehu-akter-riya",
  storageBucket: "pehu-akter-riya.firebasestorage.app",
  messagingSenderId: "485101524618",
  appId: "1:485101524618:web:f022c78946e2608b64ff73"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
