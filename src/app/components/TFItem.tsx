import React from 'react';
import { ITFItem } from '../types/TFItem.types';
import Image from 'next/image';
import { ITEM_QUALITY } from '../lib/utils';

type Props = {
	readonly data: ITFItem;
};

const ItemQualityToColorMap = new Map([
	[ITEM_QUALITY.STRANGE, '#CF6A32'],
	[ITEM_QUALITY.NORMAL, '#B2B2B2'],
	[ITEM_QUALITY.UNUSUAL, '#FFD700'],
	[ITEM_QUALITY.UNIQUE, '#FFD700'],
]);
const TFItem = ({ data }: Props) => {
	console.log({ data });

	if (!data) {
		return null;
	}
	return (
		<div
			className="flex h-16 w-16 flex-wrap"
			style={{ backgroundColor: ItemQualityToColorMap.get(data.item_quality) }}
		>
			{/* {data?.name || 'N/A'} */}

			<Image src={data.image_url} width={100} height={100} alt={data.name} />
		</div>
	);
};

export default TFItem;
