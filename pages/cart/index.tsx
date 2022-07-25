/** @format */
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context';

const CartPage = () => {
	const { numberOfItems = 0, isLoaded, cart } = useContext(CartContext);
	const router = useRouter();

	useEffect(() => {
		if (isLoaded && cart.length === 0) router.replace('/cart/empty');
	}, [isLoaded, cart, router]);

	if (!isLoaded || cart.length === 0) return <></>;

	return (
		<ShopLayout
			title={`Carrito - ${numberOfItems} productos`}
			pageDescription='Carrito de compras de la tienda'>
			<Typography variant='h1' component='h1'>
				Carrito
			</Typography>
			<Grid container>
				<Grid item xs={12} sm={7}>
					<CartList editable />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className='summary-card'>
						<CardContent>
							<Typography variant='h2'>Orden</Typography>
							<Divider sx={{ my: 1 }} />
							<OrderSummary />
							<Box sx={{ mt: 3 }}>
								<Button color='secondary' className='circular-btn' fullWidth>
									Checkout
								</Button>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default CartPage;
