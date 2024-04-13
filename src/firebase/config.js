import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage} from "firebase/storage"

export const firebaseConfig = {
  apiKey: "AIzaSyDH0j_LGBBpQ9H0ghgmchks67MliZvHtfg",
  authDomain: "eshop-d665e.firebaseapp.com",
  projectId: "eshop-d665e",
  storageBucket: "eshop-d665e.appspot.com",
  messagingSenderId: "397360950997",
  appId: "1:397360950997:web:42ac124f1248dab98f7c5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
