import React from 'react';
import { ITFItem } from '../types/TFItem.types';
import Image from 'next/image';
import { ITEM_QUALITY } from '../lib/utils';

type Props = {
	readonly data: ITFItem;
};

const ItemQualityToBorderMap = new Map([
	[ITEM_QUALITY.STRANGE, '#CF6A32'],
	[ITEM_QUALITY.NORMAL, '#B2B2B2'],
	[ITEM_QUALITY.UNUSUAL, '#FFD700'],
	[ITEM_QUALITY.UNIQUE, '#FFD700'],
]);
const ItemQualityToBackgroundMap = new Map([
	[ITEM_QUALITY.STRANGE, '#CF6A32'],
	[ITEM_QUALITY.NORMAL, '#B2B2B2'],
	[ITEM_QUALITY.UNUSUAL, '#34243F'],
	[ITEM_QUALITY.UNIQUE, '#584C1A'],
]);
const TFItem = ({ data }: Props) => {
	console.log({ data });

	if (!data) {
		return null;
	}
	return (
		<a
			href={`https://backpack.tf/stats/Unique/${encodeURIComponent(data.name.replace('The', '').trim())}/Tradable/Craftable`}
			target="_blank"
			rel="noopener noreferrer"
			className="flex h-24 w-24 flex-wrap rounded-lg"
			style={{
				border: `2px solid ${ItemQualityToBorderMap.get(data.item_quality)}`,
				backgroundColor: ItemQualityToBackgroundMap.get(data.item_quality),
			}}
		>
			<Image src={data.image_url} width={100} height={100} alt={data.name} />
		</a>
	);
};

export default TFItem;
