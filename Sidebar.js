import React from 'react'
import "./Sidebar.css";
import DomutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined} from "@material-ui/icons";
import SidebarChat from './SidebarChat'
import { useStateValue } from "./StateProvider";
// import db from "./firebase";
// import firebase from "firebase";
// import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [{ user }, dispatch] = useStateValue();
  var a = 0;
  localStorage.number=a


  return (
    <div className="sidebar">
      <div className="sidebar__header">
      <Avatar src={user.photoURL} />

        <div className="sidebar__headerRight">
          <IconButton>
            <DomutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>

        <div className="sidebarheader__right"></div>
      </div>

      <div className="sidebar__search">
          <div className="sidebar__searchContainer">
              <SearchOutlined />
              <input placeholder="Search or start new chat" type="text"/>
          </div>


      </div>

      <div className="sidebar__chats">
       
        <SidebarChat  />
        <SidebarChat  />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;
