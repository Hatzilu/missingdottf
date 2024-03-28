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
		<div>
			<label htmlFor="steamid">Stea1mID</label>
			<input
				value={steamId}
				onChange={(t) => setSteamId(t.target.value)}
				className="rounded-sm text-slate-900"
				name="steamid"
				placeholder="your Steam ID or username"
			/>
			<button onClick={check}>Send</button>
			<div className="flex flex-wrap">
				{items.length > 0 ? items.map((item) => <TFItem data={item} />) : null}
			</div>
		</div>
	);
};

export default Auth;
