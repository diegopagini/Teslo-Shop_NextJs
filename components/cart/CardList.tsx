/** @format */
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { FC, useContext } from 'react';

import { CartContext } from '../../context';
import { ICartProduct } from '../../interfaces';
import { ItemCounter } from '../ui';

interface Props {
	editable?: boolean;
}

export const CardList: FC<Props> = ({ editable = false }) => {
	const { cart } = useContext(CartContext);

	return (
		<>
			{cart.map((product: ICartProduct) => (
				<Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>
					<Grid item xs={3}>
						<NextLink href='/products/slug' passHref>
							<Link>
								<CardActionArea>
									<CardMedia
										image={`/products/${product.image}`}
										component='img'
										sx={{ boderRadius: '5px' }}
									/>
								</CardActionArea>
							</Link>
						</NextLink>
					</Grid>
					<Grid item xs={7}>
						<Box display='flex' flexDirection='column'>
							<Typography variant='body1'>{product.title}</Typography>
							<Typography variant='body1'>
								Talla: <strong>{product.size}</strong>
							</Typography>

							{editable ? (
								<ItemCounter
									currentValue={product.quantity}
									maxValue={10}
									updateQuantity={() => {}}
								/>
							) : (
								<Typography variant='h4'>
									{product.quantity} {product.quantity > 1 ? 'productos' : 'producto'}
								</Typography>
							)}
						</Box>
					</Grid>
					<Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
						<Typography variant='subtitle1'>${product.price}</Typography>

						{editable && (
							<Button variant='text' color='secondary'>
								Remover
							</Button>
						)}
					</Grid>
				</Grid>
			))}
		</>
	);
};
