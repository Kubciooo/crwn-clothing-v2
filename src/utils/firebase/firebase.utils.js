import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGDnTsYDK1kkOaccvO97AUwBmUU2m9mQE",
  authDomain: "react-1b5e1.firebaseapp.com",
  projectId: "react-1b5e1",
  storageBucket: "react-1b5e1.appspot.com",
  messagingSenderId: "185550971157",
  appId: "1:185550971157:web:02aed9ab7e2cc0c728891c",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

// export const createUserProfileDocument = async (userAuth, additionalData) => {
//   if (!userAuth) return;

//   console.log(userAuth);
// };

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userRef);
  
  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        photoURL,
        createdAt,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userRef;
};
