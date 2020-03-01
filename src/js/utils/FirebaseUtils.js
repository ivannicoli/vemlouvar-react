import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAAlJiq_03o5pJsczt1pl36J9yqghZ8C5k",
    authDomain: "vemlouvar-30a00.firebaseapp.com",
    databaseURL: "https://vemlouvar-30a00.firebaseio.com",
    projectId: "vemlouvar-30a00",
    storageBucket: "vemlouvar-30a00.appspot.com",
    messagingSenderId: "385558232422",
    appId: "1:385558232422:web:e62886c2f46faff0"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firestore = firebase.firestore();

export const musicasRef = firestore.collection("musicas");
export const momentosRef = firestore.collection("momentos");
export const missasRef = firestore.collection("missas");