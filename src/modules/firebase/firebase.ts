import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from '@firebase/firestore';
import { getDatabase } from '@firebase/database';

// Your web app's Firebase configuration
import { firebaseConfig } from './firebaseConfig';

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const realtimeDatabase = getDatabase(firebaseApp);
export const firestore = initializeFirestore(firebaseApp, {});
export const firebaseAuth = getAuth(firebaseApp);
