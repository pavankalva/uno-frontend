import React from 'react';
export default function Card({color='black', value='?', onClick}){
  const map = { red:'bg-red-600', blue:'bg-blue-600', green:'bg-green-600', yellow:'bg-yellow-400', black:'bg-black text-white' };
  const cls = map[color] || 'bg-slate-700';
  return (<div onClick={onClick} className={`card-placeholder ${cls} text-white`}><div>{value}</div></div>);
}
