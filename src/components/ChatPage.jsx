import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import firebase from './firebase'


function ChatPage(props) {
    let chatBodyRef = useRef();
    let myUID = useRef();
    let history = useHistory();
    const msgInputRef = useRef();
    const firebaseMsgRef = firebase.database().ref("!Instagram/Chats")
    const firebaseProfilesRef = firebase.database().ref("!Instagram/Profiles");
    const [theirName, setTheirName] = useState(""),
        [theirPP, setTherirPP] = useState("");
    const [texts, setTexts] = useState([]);
    let serverUID = useRef();
    let messageRef = useRef();
    messageRef.current = firebaseMsgRef;
    let callBackFunc = useRef();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                firebaseProfilesRef.child(props.match.params.theirUID).once("value").then(snap => {
                    setTexts([]);
                    // console.log(snap.val())
                    setTheirName(snap.val().name)
                    setTherirPP(snap.val().photoURL)
                    myUID.current = firebaseUser.uid;
                    try {
                        messageRef.current.child(serverUID.current).off("child_added", callBackFunc.current);
                    } catch (e) {
                        //Fuck you error
                    }
                    serverUID.current = ((snap.val().uid.localeCompare(firebaseUser.uid) < 0) ? (snap.val().uid + firebaseUser.uid) : (firebaseUser.uid + snap.val().uid))
                    // console.log(messageRef.current)
                    messageRef.current = firebaseMsgRef.child(serverUID.current);
                    // console.log(messageRef.current)
                    callBackFunc.current = tt => {
                        setTexts(prevTexts => [...prevTexts, tt.val()])
                        try {
                            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
                        } catch (e) {
                            //fuck you error
                        }
                    }
                    messageRef.current.on("child_added", callBackFunc.current);
                })
            }
        })
    }, [window.location.href]);

    useEffect(() => {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }, [texts])

    function sendMsg() {
        if (msgInputRef.current.value !== "")
            firebaseMsgRef.child(serverUID.current).push({
                text: msgInputRef.current.value.trim(),
                user: myUID.current
            });
        msgInputRef.current.value = "";
        msgInputRef.current.focus();
    }

    function sendMsgOnEnter(e) {
        if (e.key === "Enter")
            sendMsg();
    }

    return (
        <div className="chat-page">
            <div className="chat-page-header">
                <IconButton className="back-btn" onClick={() => { history.push("/") }}>
                    <ArrowBackRoundedIcon />
                </IconButton>
                <div className="chat-name">{theirName}</div>
                <img className="chat-page-pp" src={theirPP} />
            </div>
            <div className="chat-page-body" ref={chatBodyRef}>
                {
                    texts.map(text => (
                        (text.user === myUID.current) ? (
                            <div className="text-holder my-text-holder">
                                <span className="text">{text.text}</span>
                            </div>
                        ) : (
                                <div className="text-holder their-text-holder">
                                    <span className="text">{text.text}</span>
                                </div>
                            )
                    ))
                }
            </div>
            <div className="chat-page-footer">
                <div className="send-msg-holder">
                    <input ref={msgInputRef} type="text" className="msg-input" placeholder="Message..." onKeyDown={sendMsgOnEnter} />
                    <IconButton className="send-msg" onClick={sendMsg}>
                        <SendRoundedIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default ChatPage;
