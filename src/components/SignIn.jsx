import React from 'react'
import SignInBtn from './btn_google_signin_light_normal_web@2x.png';
import firebase from './firebase.js'
import { useHistory } from 'react-router-dom'

function SignIn() {
    let history = useHistory();

    function requestLogIn() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    }

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser)
            history.push("/");
    });

    return (
        <div className="sign-page">
            <div className="branding-name">!Instagram</div>
            <img src={SignInBtn} className="sign-in-btn" onClick={requestLogIn} />
        </div>
    )
}

export default SignIn;
