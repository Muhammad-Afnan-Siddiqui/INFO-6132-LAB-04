import { initializeApp } from 'firebase/app';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDvR5EQMSb1360JAVNYtqjNnMYq6ZSSBho",
    authDomain: "info-6132-lab-04-69968.firebaseapp.com",
    projectId: "info-6132-lab-04-69968",
    storageBucket: "info-6132-lab-04-69968.appspot.com",
    messagingSenderId: "826671882844",
    appId: "1:826671882844:web:81c34a3b023328366e3c99"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { addDoc, collection, deleteDoc, doc, firestore, getDocs, serverTimestamp };
