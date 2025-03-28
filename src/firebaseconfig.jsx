// src/firebase-config.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

// Configura Firebase con las credenciales de tu proyecto
const firebaseConfig = {
    apiKey: "AIzaSyDjvIBcVmI0sa9RUyhcralL_VK85YVOD50",
    authDomain: "danirep2-43ada.firebaseapp.com",
    projectId: "danirep2-43ada",
    storageBucket: "danirep2-43ada.firebasestorage.app",
    messagingSenderId: "644424661944",
    appId: "1:644424661944:web:82ba30788e1a57ef73ed4d"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, query, orderBy };
