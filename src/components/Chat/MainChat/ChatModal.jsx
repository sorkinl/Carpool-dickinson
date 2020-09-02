import React, {useState} from 'react';
 
const ChatModal = (props)=>{
    console.log(props)
    //from the parent
    function setChatModalOff(){
        // console.log(props.setChatModalOn)
        props.setChatModalOn(false)

    }
    return(
        <div className = "chat-modal">
                <div className = "chat-modal__header"> 
                   header
                   <button onClick = {setChatModalOff}>
                       Close
                    </button>

                   
                    
                </div>
                <div className = "chat-modal_body">
                    {props.messages.memberIds}
                </div>
                <div className = "chat-modal_end">
                    end
                </div>
         </div>
    )
}
export default ChatModal;

