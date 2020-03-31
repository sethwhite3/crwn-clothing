import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCWDAJfpTDxZoQg8__QONCuI-ZxobaWbzE",
    authDomain: "crwn-db-ffc80.firebaseapp.com",
    databaseURL: "https://crwn-db-ffc80.firebaseio.com",
    projectId: "crwn-db-ffc80",
    storageBucket: "crwn-db-ffc80.appspot.com",
    messagingSenderId: "888589116083",
    appId: "1:888589116083:web:b8288461030367a3e506c6",
    measurementId: "G-W9LYQZE0TY"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;