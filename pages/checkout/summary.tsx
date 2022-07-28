/** @format */
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context';

const SummaryPage: NextPage = () => {
	const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext);
	const router = useRouter();
	const [isPosting, setIsPosting] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		if (!Cookies.get('firstName')) {
			router.push('/checkout/address');
		}
	}, [router]);

	const onCreateOrder = async () => {
		setIsPosting(true);
		const { hasError, message } = await createOrder();

		if (hasError) {
			setIsPosting(false);
			setErrorMessage(message);
			return;
		}

		router.replace(`/orders/${message}`);
	};

	if (!shippingAddress) return <></>;

	const { firstName, lastName, address, address2, city, country, phone, zip } = shippingAddress;

	return (
		<ShopLayout title='Resumen de Orden' pageDescription='Resumen de la Orden'>
			<Typography variant='h1' component='h1'>
				Resumen
			</Typography>
			<Grid container>
				<Grid item xs={12} sm={7}>
					<CartList />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className='summary-card'>
						<CardContent>
							<Typography variant='h2'>
								Resumen ({numberOfItems} {numberOfItems === 0 ? 'producto' : 'productos'})
							</Typography>
							<Divider sx={{ my: 1 }} />

							<Box display='flex' justifyContent='space-between'>
								<Typography variant='subtitle1'>Dirección de Entrega</Typography>
								<NextLink href='/checkout/address' passHref>
									<Link underline='always'>Editar</Link>
								</NextLink>
							</Box>

							<Typography>
								{firstName} {lastName}
							</Typography>
							<Typography>
								{address} {address2 ? `, ${address2}` : ''}
							</Typography>
							<Typography>{city}</Typography>
							<Typography>{zip}</Typography>
							<Typography>{country}</Typography>
							<Typography>{phone}</Typography>

							<Divider sx={{ my: 2 }} />

							<Box display='flex' justifyContent='end'>
								<NextLink href='/cart' passHref>
									<Link underline='always'>Editar</Link>
								</NextLink>
							</Box>
							<OrderSummary />

							<Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
								<Button
									color='secondary'
									className='circular-btn'
									fullWidth
									onClick={onCreateOrder}
									disabled={isPosting}>
									Confirmar Orden
								</Button>

								<Chip
									color='error'
									label={errorMessage}
									sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
								/>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default SummaryPage;
