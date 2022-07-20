import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfPYCf16TCqKYIZamvH7ts285c-KDpGxY",
  authDomain: "go-and-rent-2022.firebaseapp.com",
  projectId: "go-and-rent-2022",
  storageBucket: "go-and-rent-2022.appspot.com",
  messagingSenderId: "37544160658",
  appId: "1:37544160658:web:0ee3b46da126bfdddb254b",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, firebaseConfig };
