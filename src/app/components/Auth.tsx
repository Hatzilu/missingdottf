'use client';
import React, { useState } from 'react';
import TFItem from './TFItem';
import { ITFItem } from '../types/TFItem.types';

const Auth = () => {
	const [steamId, setSteamId] = useState('');
	const [items, setItems] = useState<ITFItem[]>([]);

	console.log(steamId);

	const check = async () => {
		const res = await fetch(`http://localhost:3000/api/steam/playerItems`, {
			method: 'POST',
			body: JSON.stringify({ steamId }),
		});

		const json = await res.json();

		console.log({ json });

		setItems(json);
	};

	return (
		<div className="flex flex-col gap-10">
			<div className="flex gap-2">
				<label className="text-slate-200" htmlFor="steamid">
					SteamID
				</label>
				<input
					value={steamId}
					onChange={(t) => setSteamId(t.target.value)}
					className="rounded-sm text-slate-900"
					name="steamid"
					placeholder="your Steam ID or username"
				/>
				<button className="font-bold text-slate-200" onClick={check}>
					Send
				</button>
			</div>
			<div className="flex flex-wrap gap-3">
				{items.length > 0 ? items.map((item) => <TFItem data={item} />) : null}
			</div>
		</div>
	);
};

export default Auth;
