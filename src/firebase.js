import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyCf-k6SUSmh6MRdPqCNt64WMeKtOQBsgkU",
authDomain: "voco-onlinestore.firebaseapp.com",
databaseURL: "https://voco-onlinestore.firebaseio.com",
projectId: "voco-onlinestore",
storageBucket: "voco-onlinestore.appspot.com",
messagingSenderId: "883509337662",
appId: "1:883509337662:web:bacd3bf0cb52b32b2c7b6f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const storage = firebase.storage();


