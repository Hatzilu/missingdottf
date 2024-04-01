import { expect, test, describe } from 'vitest';
import { diffArrayWithSchema } from '../lib/utils';

describe('diffArrayWithSchema', () => {
	test('handles dupes', () => {
		const weaponCountMap = new Map([
			['The Bazaar Bargain', 2],
			['The Frontier Justice', 3],
		]);

		const result = diffArrayWithSchema(weaponCountMap);
		expect(weaponCountMap).toBeTruthy();

		const dupe = result.duplicateWeapons.find((wep) => wep.name === 'The Bazaar Bargain');
		const dupe2 = result.duplicateWeapons.find((wep) => wep.name === 'The Frontier Justice');

		expect(dupe?.duplicateCount).toEqual(2);
		expect(dupe2?.duplicateCount).toEqual(3);
	});
	test('handles missing weapons', () => {
		const weaponCountMap = new Map([['The Frontier Justice', 3]]);

		const result = diffArrayWithSchema(weaponCountMap);
		expect(weaponCountMap).toBeTruthy();

		const missing1 = result.missingWeapons.find((wep) => wep.name === 'The Bazaar Bargain');
		const missing2 = result.missingWeapons.find((wep) => wep.name === 'The Sandvich');
		const notMissing = result.missingWeapons.find((wep) => wep.name === 'The Frontier Justice');

		expect(missing1?.name).toEqual('The Bazaar Bargain');
		expect(missing2?.name).toEqual('The Sandvich');
		expect(notMissing).toBeUndefined();
	});
});
