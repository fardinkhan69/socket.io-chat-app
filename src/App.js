import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';

const socket = io.connect('https://protected-thicket-27660.herokuapp.com')

function App() {

  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit('join_room', room);
      setShowChat(true)
    }
  }


  return (
    <div className="App">

      {!showChat ? (
        <div className="joinChatContainer">


          <h3>Join A chat </h3>
          <input type="text" placeholder="username" onChange={(e) => { setUserName(e.target.value) }} />
          <input type="text" placeholder="room id" onChange={(e) => { setRoom(e.target.value) }} />
          <button onClick={joinRoom}>join room</button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={room} />
      )}


    </div>
  );
}

export default App;
