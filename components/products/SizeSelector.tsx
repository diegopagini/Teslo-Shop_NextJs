/** @format */
import { Box, Button } from '@mui/material';
import { FC } from 'react';

import { ISize } from '../../interfaces';

interface Props {
	selectedSize?: ISize;
	sizes: ISize[];
	onSelectedSize: (size: ISize) => void; // This is the way to pass information from child to his father.
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes, onSelectedSize }) => {
	return (
		<Box>
			{sizes.map((size: ISize) => (
				<Button
					key={size}
					size='small'
					color={selectedSize === size ? 'primary' : 'info'}
					onClick={() => onSelectedSize(size)}>
					{/* Emitter to father */}
					{size}
				</Button>
			))}
		</Box>
	);
};
