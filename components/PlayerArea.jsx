import React from 'react';
export default function PlayerArea({name, count}){
  return (<div className="p-2 bg-slate-900/50 rounded"><div className="font-medium">{name}</div><div className="text-sm text-slate-400">{count} cards</div></div>);
}
