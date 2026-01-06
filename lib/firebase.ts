import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (getApps().length > 0) {
    app = getApp();
    auth = getAuth(app);
    db = getFirestore(app);
} else {
    // Only initialize if config is present (or let it fail if crucial)
    // For build time without env vars, we might want to return mock/null, 
    // but the app structure relies on 'auth' being an object.

    // Check if we are in a browser environment or if config is available
    if (typeof window !== "undefined" || firebaseConfig.projectId) {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
    } else {
        // Fallback for server-side build without keys - use a dummy app?
        // This is risky. Better to try initializing.
        // If initializeApp is called with missing keys, it might throw.
        try {
            app = initializeApp(firebaseConfig);
            auth = getAuth(app);
            db = getFirestore(app);
        } catch (e) {
            console.warn("Firebase initialization failed (likely missing env vars during build). Using mock objects.");
            // @ts-ignore
            auth = {};
            // @ts-ignore
            db = {};
        }
    }
}

export { auth, db };
