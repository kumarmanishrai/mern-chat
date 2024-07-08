import { useState } from "react";
import "./App.css";

import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("https://mern-chat-ddv1.vercel.app");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            name="username"
            placeholder="Manish..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            name="room"
            placeholder="Room Id..."
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
