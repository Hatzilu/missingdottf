import schema from '../assets/itemSchema.json';

export const ITEM_QUALITY = {
	NORMAL: 0,
	UNUSUAL: 4,
	UNIQUE: 6,
	STRANGE: 11,
};

export function diffArrayWithSchema(
	arr: Array<Steam.RgInventory & { details: Steam.RgDescription }>,
	map: Map<string, boolean>,
) {
	// for now just get all craftable unique weapons
	const weps = schema.result.items.filter(
		(item) => item['item_quality'] === 6 && item['craft_class'] === 'weapon',
	);

	const missingWeapons = weps.filter((weapon) => map.has(weapon.name));

	return missingWeapons;
}
export function generateDescriptionMap(r: Steam.InventoryResponse['descriptions']) {
	const arr = Object.values(r);

	const map = new Map<string, Steam.RgDescription>();
	arr.forEach((desc) => {
		const id = `${desc.classid}_${desc.instanceid}`;
		if (map.has(id)) {
			return;
		}
		map.set(id, desc);
	});
	return map;
}
export function generateItemArray(response: Steam.InventoryResponse) {
	const inventoryItems = Object.values(response.assets);
	const descriptions = generateDescriptionMap(response.descriptions);

	const map = new Map<string, boolean>();

	const newItems: any[] = [];
	inventoryItems.forEach((item) => {
		const id = `${item.classid}_${item.instanceid}`;

		if (!descriptions.has(id)) {
			console.log('no item for id', id);
			return;
		}

		const detailedItem = descriptions.get(id);

		if (!detailedItem) {
			return;
		}
		if (detailedItem.tradable === 0) {
			console.log(`untradable item`, detailedItem.market_name);
			return;
		}

		const d = {
			...item,
			details: detailedItem,
		};
		newItems.push(d);
		map.set(detailedItem.market_name, true);
	});
	return { items: newItems, map: map };
}
