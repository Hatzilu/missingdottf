'use client'
import React, { useState } from 'react'

const Auth = () => {
    const [steamId, setSteamId] = useState('')
    const [items, setItems] = useState<string[]>([])

    const check = async () => {
        setItems(['todo']);
    }

  return (
    <div>
        <label htmlFor='steamid' >SteamID</label>
        <input value={steamId} onChange={(t) => setSteamId(t.target.value)} className='rounded-sm text-slate-900' name='steamid' placeholder='your Steam ID or username'/>
        <button onClick={check}>Send</button>

        {items.length > 0 ? <p>I still don't have access to the steam web API, but once i do i'll add more functionality, TODO.</p> : null}
    </div>
  )
}

export default Auth
