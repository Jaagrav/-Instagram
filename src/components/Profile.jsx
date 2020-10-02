import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import firebase from './firebase.js';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function Profile() {
    let myUID = "";
    let history = useHistory();
    let [users, setUsers] = useState([]);
    let [profilePicture, setProfilePicture] = useState("");
    const firebaseProfilesRef = firebase.database().ref("!Instagram/Profiles");

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (!firebaseUser) history.push("/login");
            else {
                setProfilePicture(firebaseUser.photoURL)
                firebaseProfilesRef.child(firebaseUser.uid).set({
                    name: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    uid: firebaseUser.uid
                })
                myUID = firebaseUser.uid;
                // console.log(firebaseUser)
                firebaseProfilesRef.on("child_added", snap => {
                    if (snap.val().uid !== myUID)
                        setUsers(prevUsers => [...prevUsers, snap.val()])
                    // console.log(snap.val())
                })
            }
        });
    }, []);

    return (
        <div className="profile-page">
            <div className="header">
                <div className="site-name">!Instagram</div>
                <IconButton className="my-profile-picture-btn" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <img className="my-profile-picture" src={profilePicture} />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => { firebase.auth().signOut(); handleClose(); }}>Logout</MenuItem>
                </Menu>
            </div>
            <div className="body">
                {
                    users.map(user => (
                        <Link to={"/chat/" + user.uid} key={user.uid}>
                            <div className="user-block" >
                                <img className="profile-picture" src={user.photoURL} />
                                <span className="user-name">{user.name}</span>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Profile
