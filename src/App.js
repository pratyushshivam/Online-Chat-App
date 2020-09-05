import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import Pusher from "pusher-js";
import axios from "./axios";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    //run once
    const pusher = new Pusher("3db6e59d8b7050c2bfc7", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  console.log(messages);
  

  return (
    <div className="app">
    <div className="app__body">
      {/* <Login /> */}
      {!user ? (
        <Login />
      ) : (
        <>
          <Sidebar />
          <Chat messages={messages} />
        </>
      )}

      
    </div>
  </div>
  );
}

export default App;
