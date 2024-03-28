import schema from '../assets/itemSchema.json';

export const ITEM_QUALITY = {
	NORMAL: 0,
	UNUSUAL: 4,
	UNIQUE: 6,
	STRANGE: 11,
};

export function diffArrayWithSchema(
	arr: Array<Steam.RgInventory & { details: Steam.RgDescription }>,
	duplicateMap: Map<string, number>,
) {
	// for now just get all craftable unique weapons
	const weps = schema.result.items.filter(
		(item) => item['item_quality'] === 6 && item['craft_class'] === 'weapon',
	);

	const missingWeapons = weps.filter(
		(weapon) => !duplicateMap.has(weapon.name) && !weapon.name.includes('TF_WEAPON_'),
	);

	// console.log(arr);

	const duplicateWeapons = arr.filter((w) => {
		if (!duplicateMap.has(w.details.market_name)) {
			return;
		}
		const numberOfDuplicates = duplicateMap.get(w.details.market_name);
		if (!numberOfDuplicates) {
			return;
		}
		return numberOfDuplicates > 1;
	});

	return { missingWeapons, duplicateWeapons };
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

	const duplicateMap = new Map<string, number>();

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

		const d = {
			...item,
			details: detailedItem,
		};
		newItems.push(d);
		if (duplicateMap.has(detailedItem.market_name)) {
			let duplicateNumber = duplicateMap.get(detailedItem.market_name);
			if (typeof duplicateNumber !== 'number') {
				throw new Error('map has non-number value');
			}
			duplicateMap.set(detailedItem.market_name, duplicateNumber++);
			return;
		}
		duplicateMap.set(detailedItem.market_name, 1);
	});
	return { items: newItems, duplicateMap };
}
