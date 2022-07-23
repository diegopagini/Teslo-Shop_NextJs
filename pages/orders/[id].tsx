/** @format */
import { CreditScoreOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import { NextPage } from 'next';
import NextLink from 'next/link';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';

const OrderPage: NextPage = () => {
	return (
		<ShopLayout title='Resumen de Orden 123123' pageDescription='Resumen de la Orden'>
			<Typography variant='h1' component='h1'>
				Orden: ABC123
			</Typography>

			{/* <Chip
				sx={{ my: 2 }}
				label='Pendiente de pago'
				variant='outlined'
				color='error'
				icon={<CreditCardOutlined />}
			/> */}
			<Chip
				sx={{ my: 2 }}
				label='Orden Pagada'
				variant='outlined'
				color='success'
				icon={<CreditScoreOutlined />}
			/>

			<Grid container>
				<Grid item xs={12} sm={7}>
					<CartList />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className='summary-card'>
						<CardContent>
							<Typography variant='h2'>Resumen (3 productos)</Typography>
							<Divider sx={{ my: 1 }} />

							<Box display='flex' justifyContent='space-between'>
								<Typography variant='subtitle1'>Dirección de Entrega</Typography>
								<NextLink href='/checkout/address' passHref>
									<Link underline='always'>Editar</Link>
								</NextLink>
							</Box>

							<Typography>Diego Pagini</Typography>
							<Typography>Algun Lugar</Typography>
							<Typography>29640</Typography>
							<Typography>España</Typography>

							<Divider sx={{ my: 2 }} />

							<Box display='flex' justifyContent='end'>
								<NextLink href='/cart' passHref>
									<Link underline='always'>Editar</Link>
								</NextLink>
							</Box>
							<OrderSummary />

							<Box sx={{ mt: 3 }}>
								{/* TODO */}
								<h1>Pagar</h1>
								<Chip
									sx={{ my: 2 }}
									label='Orden Pagada'
									variant='outlined'
									color='success'
									icon={<CreditScoreOutlined />}
								/>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default OrderPage;
