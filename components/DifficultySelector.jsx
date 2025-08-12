import React from 'react';
export default function DifficultySelector({value,onChange}){
  return (<select value={value} onChange={(e)=>onChange(e.target.value)} className="p-2 rounded bg-slate-800">
    <option value="easy">Easy</option>
    <option value="hard">Hard</option>
    <option value="difficult">Difficult</option>
  </select>);
}
