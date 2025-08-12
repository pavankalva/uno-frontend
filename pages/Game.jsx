import React, {useEffect, useState} from 'react';
import { socket } from '../utils/socket.js';
import PlayerArea from '../components/PlayerArea.jsx';
import Card from '../components/Card.jsx';

export default function Game({user, roomCode, onExit}){
  const [state, setState] = useState(null);
  const [log, setLog] = useState('');

  useEffect(()=>{
    socket.emit('getState', { roomCode }, (st)=> setState(st));
    socket.on('roomUpdate', st=> setState(st));
    return ()=> socket.off('roomUpdate');
  },[roomCode]);

  function doDraw(){ socket.emit('drawCard', { roomCode, playerId: user.id }, (res)=> setLog('Drew:'+JSON.stringify(res.card))); }
  function doLeave(){ onExit(); }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-slate-900/60 p-4 rounded">
        <div className="flex justify-between items-center mb-4">
          <div><h3 className="text-lg">Room: {roomCode}</h3><div className="text-sm text-slate-400">Player: {user.username}</div></div>
          <div className="flex gap-2"><button onClick={doDraw} className="btn bg-sky-600">Draw</button><button onClick={doLeave} className="btn bg-red-600">Leave</button></div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div><h4 className="text-sm text-slate-300">Discard</h4><div className="p-3 bg-slate-800 rounded">{state?.discardTop? <Card color={state.discardTop.color||'black'} value={state.discardTop.value||state.discardTop.action||'WILD'} />:'-'}</div></div>
          <div><h4 className="text-sm text-slate-300">Your Hand</h4><div className="p-3 bg-slate-800 rounded">Cards: {state?.handsCount?.[user.id]||0}</div></div>
          <div><h4 className="text-sm text-slate-300">Players</h4><div className="p-3 bg-slate-800 rounded">{(state?.players||[]).map(p=> <PlayerArea key={p} name={p} count={state.handsCount?.[p]||0} />)}</div></div>
          <div><h4 className="text-sm text-slate-300">Log</h4><pre className="p-3 bg-black/30 rounded text-xs">{log}</pre></div>
        </div>
      </div>
    </div>
  );
}
