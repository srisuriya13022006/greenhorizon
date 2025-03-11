import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Import Storage

const firebaseConfig = {
  apiKey: "AIzaSyDVFjZH08IdNh0tpxaf37_oo_mA4vShczs",
  authDomain: "green-horizon-209e9.firebaseapp.com",
  projectId: "green-horizon-209e9",
  storageBucket: "green-horizon-209e9.appspot.com",
  messagingSenderId: "142306266478",
  appId: "1:142306266478:android:db3a377eafd164ccc5457f"
};

// ✅ Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// ✅ Export Firestore Database
export const fireStore = getFirestore(app);

// ✅ Export Firebase Authentication
export const auth = getAuth(app);

// ✅ Export Firebase Storage (For Image Uploads)
export const storage = getStorage(app);
