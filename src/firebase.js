import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD_kxxJzpLtSOI54J3Lq09I5wePyFRz23k",
    authDomain: "golpovilla.firebaseapp.com",
    databaseURL: "https://golpovilla.firebaseio.com",
    projectId: "golpovilla",
    storageBucket: "golpovilla.appspot.com",
    messagingSenderId: "668056085895",
    appId: "1:668056085895:web:e62ae4b794721c01849f22",
    measurementId: "G-FKJ09BD07X"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
