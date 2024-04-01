import schema from '../assets/itemSchema.json';

export const ITEM_QUALITY = {
	NORMAL: 0,
	UNUSUAL: 4,
	UNIQUE: 6,
	STRANGE: 11,
};

export function diffArrayWithSchema(weaponCountMap: Map<string, number>) {
	// for now just get all craftable unique weapons
	const weps = schema.result.items.filter(
		(item) => item['item_quality'] === 6 && item['craft_class'] === 'weapon',
	);

	const missingWeapons = weps.filter(
		(weapon) => !weaponCountMap.has(weapon.name) && !weapon.name.includes('TF_WEAPON_'),
	);
	const duplicateWeapons: Array<(typeof weps)['0'] & { duplicateCount: number }> = [];

	weps.forEach((weapon) => {
		if (!weaponCountMap.has(weapon.name)) {
			return;
		}
		const duplicateCount = weaponCountMap.get(weapon.name);
		if (!duplicateCount) {
			throw new Error(`Failed to get duplicate count for ${weapon.name}`);
		}
		const isDupe = weaponCountMap.has(weapon.name) && duplicateCount > 1;
		if (isDupe) {
			duplicateWeapons.push({ ...weapon, duplicateCount });
		}
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
			duplicateMap.set(detailedItem.market_name, duplicateNumber + 1);
			return;
		}
		duplicateMap.set(detailedItem.market_name, 1);
	});
	return { items: newItems, duplicateMap };
}
