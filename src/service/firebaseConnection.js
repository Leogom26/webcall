import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCD3tXFyfAv9nxYp3hOQzOE0AH1x2tsY8Y",
  authDomain: "webcall-a8275.firebaseapp.com",
  projectId: "webcall-a8275",
  storageBucket: "webcall-a8275.firebasestorage.app",
  messagingSenderId: "885595269307",
  appId: "1:885595269307:web:558518622860b193a1619e"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }