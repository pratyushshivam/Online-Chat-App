import React from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { AttachFile, MoreVert } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
function Chat() {
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

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
        <p className="chat__message">
          <span className="chat__name">Sonny</span>
          This message was deleted
          <span className="chat__timestamp"> {new Date().toUTCString()} </span>
        </p>
        <p  className="chat__message">
          <span className="chat__name">Sonny</span>
          This message was deleted
          <span className="chat__timestamp"> {new Date().toUTCString()} </span>
        </p>
        <p  className="chat__message">
          <span className="chat__name">Sonny</span>
          This message was deleted
          <span className="chat__timestamp"> {new Date().toUTCString()} </span>
        </p>
        <p  className="chat__message chat__reciever">
          <span className="chat__name">Sonny</span>
          This message was deleted
          <span className="chat__timestamp"> {new Date().toUTCString()} </span>
        </p>

        <p  className="chat__message chat__reciever">
          <span className="chat__name">Sonny</span>
          This message was deleted
          <span className="chat__timestamp"> {new Date().toUTCString()} </span>
        </p>
        <p  className="chat__message chat__reciever">
          <span className="chat__name">Sonny</span>
          This message was deleted
          <span className="chat__timestamp"> {new Date().toUTCString()} </span>
        </p>
        <p className="chat__message">
          <span className="chat__name">Sonny</span>
          This message was deleted
          <span className="chat__timestamp"> {new Date().toUTCString()} </span>
        </p>
        <p className="chat__message">
          <span className="chat__name">Sonny</span>
          This message was deleted
          <span className="chat__timestamp"> {new Date().toUTCString()} </span>
        </p>
        <p className="chat__message">
          <span className="chat__name">Sonny</span>
          This message was deleted
          <span className="chat__timestamp"> {new Date().toUTCString()} </span>
        </p>
      </div>
      <div className="chat__footer">
          <InsertEmoticonIcon/>
          <form>
              <input placeholder="Type a message" type="text"/>
              <button type="submit" >Send a message</button>
          </form>
          <MicIcon/>
      </div>





    </div>
  );
}

export default Chat;
