import React, { useState } from "react";
import Login from "./pages/Login.jsx";
import Lobby from "./pages/Lobby.jsx";
import Game from "./pages/Game.jsx";

export default function App(){
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);

  if(!user) return <Login onLogin={setUser} />;
  if(!room) return <Lobby user={user} onEnterRoom={setRoom} />;
  return <Game user={user} roomCode={room} onExit={() => setRoom(null)} />;
}
