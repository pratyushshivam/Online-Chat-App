import React from 'react'
import './SidebarChat.css'
import { Avatar} from "@material-ui/core";


function SidebarChat() {

    localStorage.number=Number(localStorage.number) +1
    var b=localStorage.number
    
    // document.getElementsByTagName(h2).innerHTML=`Room Number ${b} `
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat__info">
    <h2>Room name {b} </h2>
                <p>This is the last message</p>
            </div>
            
        </div>
    )
}

export default SidebarChat
