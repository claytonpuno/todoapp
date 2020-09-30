import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyApoQjuWEuSn5YwEdl-LG8cYZKlQGxXC0c",
    authDomain: "todo-app-cp-145f8.firebaseapp.com",
    databaseURL: "https://todo-app-cp-145f8.firebaseio.com",
    projectId: "todo-app-cp-145f8",
    storageBucket: "todo-app-cp-145f8.appspot.com",
    messagingSenderId: "613283079302",
    appId: "1:613283079302:web:346c1c35e62a2aa6299d07",
    measurementId: "G-P5KR70LKSR"
});

const db = firebaseApp.firestore();

export default db;