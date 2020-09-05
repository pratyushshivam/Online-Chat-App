import React, { useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { AttachFile, MoreVert } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import axios from './axios'
import { useStateValue } from "./StateProvider";
function Chat({ messages}) {
  const [input,setInput] = useState('')
  // function sendMessage(e){
  
  // }
  // const sendMessage=()=>{

  // }
  const [{ user }, dispatch] = useStateValue();
  // alert(user.displayName)

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


  const sendMessage = async (e)=>{
    e.preventDefault();
    await axios.post('/messages/new',{
      message:input,
      name:user.displayName,
      timestamp:formatAMPM(new Date),
      received:true
    })

    setInput('')
  }









  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src="https://images.pexels.com/photos/355508/pexels-photo-355508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />

        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last Seen 4 hours ago</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {/* in foreach u cant return anything but in map you return jsax () so we use map */}
        {messages.map((message)=>(
           <p className={`chat__message  ${message.received && "chat__reciever"} `}>
           <span className="chat__name">{message.name}</span>
           {message.message}
           <span className="chat__timestamp">{message.timestamp} </span>
         </p>
        ))}
      </div>
      <div className="chat__footer">
          <InsertEmoticonIcon/>
          <form>
              <input value={input} 
              onChange={ (e)=>setInput(e.target.value)}
              // e.target.value is basically what user just typed in
             
              
              
              
              placeholder="Type a message" type="text"/>
              <button onClick={sendMessage} type="submit" >Send a message</button>
          </form>
         
          <MicIcon/>
      </div>

    </div>
  );
}

export default Chat;
