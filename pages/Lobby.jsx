import React, {useEffect, useState} from 'react';
import { socket } from '../utils/socket.js';
import DifficultySelector from '../components/DifficultySelector.jsx';

export default function Lobby({user,onEnterRoom}){
  const [mode,setMode]=useState('online');
  const [roomCode,setRoomCode]=useState('');
  const [status,setStatus]=useState('');

  useEffect(()=>{
    socket.auth = {};
    socket.connect();
    socket.on('connect', ()=>setStatus('connected'));
    socket.on('disconnect', ()=>setStatus('disconnected'));
    return ()=>{ socket.off('connect'); socket.off('disconnect'); socket.disconnect(); }
  },[]);

  function createRoom(){
    socket.emit('createRoom', { mode, maxPlayers: mode==='offline'?4:4, difficulty:'easy', username:user.username }, (res)=>{
      if(res?.roomCode){ setStatus('Created '+res.roomCode); onEnterRoom(res.roomCode); }
      else setStatus('Failed to create');
    });
  }

  function joinRoom(){
    if(!roomCode) return setStatus('Enter code');
    socket.emit('joinRoom', { roomCode, username:user.username }, (res)=>{
      if(res?.error) setStatus(res.error); else { setStatus('Joined'); onEnterRoom(roomCode); }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-900/70 p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-xl mb-3">Hello, {user.username}</h2>
        <div className="mb-3">
          <label className="text-sm text-slate-300">Mode</label>
          <select className="w-full p-2 rounded bg-slate-800 mb-2" value={mode} onChange={(e)=>setMode(e.target.value)}>
            <option value="online">Online (4 players)</option>
            <option value="private">Private (2-4)</option>
            <option value="offline">Offline (vs AI)</option>
          </select>
          <DifficultySelector value="easy" onChange={()=>{}} />
        </div>
        <div className="flex gap-2 mb-3">
          <button className="btn bg-indigo-600" onClick={createRoom}>Create Room</button>
          <input className="flex-1 p-2 rounded bg-slate-800" placeholder="Enter code to join" value={roomCode} onChange={e=>setRoomCode(e.target.value)} />
          <button className="btn bg-amber-500" onClick={joinRoom}>Join</button>
        </div>
        <div className="text-sm text-slate-400">{status}</div>
      </div>
    </div>
  );
}
