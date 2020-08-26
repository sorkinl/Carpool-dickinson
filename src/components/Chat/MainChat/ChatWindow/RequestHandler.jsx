import React from 'react';
import {useFirestore} from 'react-redux-firebase'

const RequestHandler = (props) => {
    const firestore = useFirestore();
    const acceptRequest = () => {
        //var chatRequest = props.chat.requests[]
        var chatMember = props.request;
        var chatMemberId = props.requestId;
        delete props.chat.requests[chatMemberId];
        firestore.update({
            collection: 'chatRooms',
            doc: props.chat.id
        }, {
            requests: {...props.chat.requests},
            members:{
                [chatMemberId]: chatMember
            }
        })
    }
    const denyRequest = () => {
        //var chatRequest = props.chat.requests[]
        var chatMember = props.request;
        var chatMemberId = props.requestId;
        delete props.chat.requests[chatMemberId];
        firestore.set({
            collection: 'chatRooms',
            doc: props.chat.id
        }, {
            requests: {...props.chat.requests},
            deniedRequests:{
                [chatMemberId]: chatMember
            }
        }, {merge: true})
    }
    return (
        <>
            <button onClick={acceptRequest}>Accept</button>
            <button onClick={denyRequest}>Deny</button>
        </>
    )
}

export default RequestHandler;