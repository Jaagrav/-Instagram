import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCtq6ZyBIYXEGNN3Y0OK78PrH0OJnyrK7o",
    authDomain: "instagram-769ed.firebaseapp.com",
    databaseURL: "https://instagram-769ed.firebaseio.com",
    projectId: "instagram-769ed",
    storageBucket: "instagram-769ed.appspot.com",
    messagingSenderId: "972171362336",
    appId: "1:972171362336:web:62d00cdee40de0290b7c45",
    measurementId: "G-S184JMH1RM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;