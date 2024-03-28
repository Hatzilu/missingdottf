import { diffArrayWithSchema, generateItemArray } from '@/app/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const data = await req.json();
	console.log(data);
	if (!data?.steamId) {
		return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
	}

	try {
		// const res = await fetch(
		// 	`https://api.steampowered.com/IEconItems_440/GetPlayerItems/v1/?steamid=${data.steamId}&key=${process.env.STEAM_API_KEY}`,
		// );
		// const json = await res.json();

		// const items = json.result.items

		const res = await fetch(
			`https://steamcommunity.com/inventory/${data.steamId}/440/2?l=english&count=5000`,
		);
		const json = await res.json();
		console.log({ json });

		const { items, map } = generateItemArray(json);

		const missingWeapons = diffArrayWithSchema(items, map);
		// filter out items according to the schema
		return NextResponse.json(missingWeapons);
	} catch (ex) {
		console.error(ex);

		return NextResponse.json({ message: 'General server error' }, { status: 500 });
	}
}
