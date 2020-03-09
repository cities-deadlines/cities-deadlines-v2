import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyDMe4tP9TMxzJfo8x8hN0i3jR2TduGmAJI",
    authDomain: "cities-deadlines.firebaseapp.com",
    databaseURL: "https://cities-deadlines.firebaseio.com",
    projectId: "cities-deadlines",
    storageBucket: "cities-deadlines.appspot.com",
    messagingSenderId: "540605887005",
    appId: "1:540605887005:web:3dd80502826e08a20a8cf4",
    measurementId: "G-B14WW3BBNY"
};

class Firebase {
    constructor() {
        app.initializeApp(config)

        this.auth = app.auth();
        this.db = app.firestore();
        this.analytics = app.analytics();

        this.googleProvider = new app.auth.GoogleAuthProvider();
    }



    /*** AUTH API ***/

    doSignIn = () => {
        return this.auth.signInWithPopup(this.googleProvider);
    }

    doSignOut = () => {
        return this.auth.signOut();
    }

    getUser = () => {
        return this.auth.currentUser;
    }



    /*** USER API ***/

    fetchUserData = () => {
        const id = this.getUser().uid;
        const userRef = this.db.collection('users').doc(id);
        return userRef.get().then(userData => {
            if (userData.exists) return userData.data();
            else return null
        });
    }



    /*** PROPERTY API ***/

    fetchProperty = id => {
        const propertyRef = this.db.collection('properties').doc(id);
        return propertyRef.get().then(property => {
            if (property.exists) return property.data();
            else return null
        });
    }
}

export default Firebase;