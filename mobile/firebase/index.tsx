import firebase from "firebase/compat";
import { getFirestore } from "firebase/firestore"
import '@firebase/auth';
import '@firebase/firestore';

// Replace this with your Firebase SDK config snippet
// const firebaseConfig = {
//     apiKey: "AIzaSyBtEidFJhrRB_4kBJSSRrA68iGaFDNX99Q",
//     authDomain: "chat-prueba-tec.firebaseapp.com",
//     databaseURL: "http://chat-prueba-tec.firebaseapp.com",
//     projectId: "chat-prueba-tec",
//     storageBucket: "chat-prueba-tec.appspot.com",
//     messagingSenderId: "1008248461556",
//     appId: "1:1008248461556:web:28c1ac53d8c7a190f8a6a1",
//     measurementId: "G-2Y54XXL6ME"
// };
const firebaseConfig = {
    apiKey: "AIzaSyDfPYCf16TCqKYIZamvH7ts285c-KDpGxY",
    authDomain: "go-and-rent-2022.firebaseapp.com",
    projectId: "go-and-rent-2022",
    storageBucket: "go-and-rent-2022.appspot.com",
    messagingSenderId: "37544160658",
    appId: "1:37544160658:web:0ee3b46da126bfdddb254b"
};



const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db};