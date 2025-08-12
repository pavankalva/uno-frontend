import React, {useState} from 'react';
export default function Login({onLogin}){
  const [name,setName]=useState('');
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-900/70 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl mb-4">UNO - Login</h2>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter name" className="w-full p-2 mb-3 rounded bg-slate-800"/>
        <div className="flex gap-2">
          <button className="btn bg-emerald-500" onClick={()=>onLogin({id: 'u'+Date.now(), username: name || 'Guest'})}>Start</button>
          <button className="btn bg-slate-700" onClick={()=>setName('Guest'+Math.floor(Math.random()*1000))}>Random</button>
        </div>
        <p className="text-slate-400 mt-3 text-sm">Connects to backend via VITE_BACKEND_URL</p>
      </div>
    </div>
  );
}
