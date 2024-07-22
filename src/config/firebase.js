// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIg6cZ3b7qVDn6frPAENM1juxH7IXqG_M",
  authDomain: "vite-basiccontact.firebaseapp.com",
  projectId: "vite-basiccontact",
  storageBucket: "vite-basiccontact.appspot.com",
  messagingSenderId: "868943725393",
  appId: "1:868943725393:web:da2d295a03dd8990208970"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);