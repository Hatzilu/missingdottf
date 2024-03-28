'use client';
import React, { useState } from 'react';
import TFItem from './TFItem';
import { ITFItem } from '../types/TFItem.types';

const Form = () => {
	const [steamId, setSteamId] = useState('');
	const [error, setError] = useState('');
	const [missingItems, setMissingItems] = useState<ITFItem[]>([]);
	const [duplicateItems, setDuplicateItems] = useState<ITFItem[]>([]);

	const check = async () => {
		const res = await fetch(`/api/steam/playerItems`, {
			method: 'POST',
			body: JSON.stringify({ steamId }),
		});

		const json = await res.json();

		if (json.message) {
			setError(json.message);
			return;
		} else {
			setError('');
		}

		console.log({ json });

		setMissingItems(json.missingWeapons);
		setDuplicateItems(json.duplicateWeapons);
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
			{missingItems.length === 0 ? null : (
				<div>
					<h1 className="text-lg text-slate-200">These are the weapons you're missing</h1>
					<div className="flex flex-wrap gap-3">
						{missingItems.map((item) => (
							<TFItem data={item} />
						))}
					</div>
				</div>
			)}
			{duplicateItems.length === 0 ? null : (
				<div>
					<h1 className="text-lg text-slate-200">These are the duplicates</h1>
					<div className="flex flex-wrap gap-3">
						{duplicateItems.map((item) => (
							<TFItem data={item} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Form;
