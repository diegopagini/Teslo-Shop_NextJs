/** @format */
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { useContext } from 'react';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context';
import { countries, jwt } from '../../utils';

const SummaryPage: NextPage = () => {
	const { shippingAddress, numberOfItems } = useContext(CartContext);

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
							<Typography>{countries.find((c) => c.code === country)?.name}</Typography>
							<Typography>{phone}</Typography>

							<Divider sx={{ my: 2 }} />

							<Box display='flex' justifyContent='end'>
								<NextLink href='/cart' passHref>
									<Link underline='always'>Editar</Link>
								</NextLink>
							</Box>
							<OrderSummary />

							<Box sx={{ mt: 3 }}>
								<Button color='secondary' className='circular-btn' fullWidth>
									Confirmar Orden
								</Button>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const { token = '' } = req.cookies;
	let isValidToken = false;

	try {
		await jwt.isValidToken(token);
		isValidToken = true;
	} catch (error) {
		isValidToken = false;
	}

	if (!isValidToken) {
		return {
			redirect: {
				destination: '/auth/login?p=/checkout/summary',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default SummaryPage;
