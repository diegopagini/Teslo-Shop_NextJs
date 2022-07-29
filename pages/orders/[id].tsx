/** @format */
import { CreditCardOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { tesloApi } from '../../api';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces/order.interface';

interface Props {
	order: IOrder;
}

type OrderResponseBody = {
	id: string;
	status: 'COMPLETED' | 'SAVED' | 'APPROVED' | 'VOIDED' | 'PAYER_ACTION_REQUIRED';
};

const OrderPage: NextPage<Props> = ({ order }) => {
	const router = useRouter();
	const { shippingAddress } = order;

	const [isPaying, setIsPaying] = useState(false);

	const onOrderCompleted = async (details: OrderResponseBody) => {
		if (details.status !== 'COMPLETED') return alert('No hay pago en PayPal');
		setIsPaying(true);

		try {
			const { data } = await tesloApi.post(`/orders/pay`, {
				transactionId: details.id,
				orderId: order._id,
			});
			router.reload();
		} catch (error) {
			setIsPaying(false);
			console.log(error);
			alert('Error');
		}
	};

	return (
		<ShopLayout title={`Resumen de Orden ${order._id}`} pageDescription='Resumen de la Orden'>
			<Typography variant='h1' component='h1'>
				Orden: {order._id}
			</Typography>

			{order.isPaid ? (
				<Chip
					sx={{ my: 2 }}
					label='Orden Pagada'
					variant='outlined'
					color='success'
					icon={<CreditScoreOutlined />}
				/>
			) : (
				<Chip
					sx={{ my: 2 }}
					label='Pendiente de pago'
					variant='outlined'
					color='error'
					icon={<CreditCardOutlined />}
				/>
			)}

			<Grid container className='fadeIn'>
				<Grid item xs={12} sm={7}>
					<CartList editable={false} products={order.orderItems} />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className='summary-card'>
						<CardContent>
							<Typography variant='h2'>
								Resumen ({order.numberOfItems}) {order.numberOfItems > 1 ? 'productos' : 'producto'}
							</Typography>
							<Divider sx={{ my: 1 }} />

							<Box display='flex' justifyContent='space-between'>
								<Typography variant='subtitle1'>Dirección de Entrega</Typography>
							</Box>

							<Typography>
								{shippingAddress.firstName} {shippingAddress.lastName}
							</Typography>
							<Typography>
								{shippingAddress.address} {shippingAddress.address2 ? shippingAddress.address2 : ''}
							</Typography>
							<Typography>
								{shippingAddress.city}, {shippingAddress.zip}
							</Typography>
							<Typography>{shippingAddress.country}</Typography>
							<Typography>{shippingAddress.phone}</Typography>

							<Divider sx={{ my: 2 }} />

							<OrderSummary
								orderValues={{
									numberOfItems: order.numberOfItems,
									subTotal: order.subTotal,
									total: order.total,
									tax: order.tax,
								}}
							/>

							<Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
								<Box
									display='flex'
									justifyContent='center'
									className='fadeIn'
									sx={{ display: isPaying ? 'flex' : 'none' }}>
									<CircularProgress />
								</Box>

								<Box sx={{ display: isPaying ? 'none' : 'flex', flex: 1 }} flexDirection='column'>
									{order.isPaid ? (
										<Chip
											sx={{ my: 2 }}
											label='Orden Pagada'
											variant='outlined'
											color='success'
											icon={<CreditScoreOutlined />}
										/>
									) : (
										<PayPalButtons
											createOrder={(data, actions) => {
												return actions.order.create({
													purchase_units: [
														{
															amount: {
																value: order.total.toString(),
															},
														},
													],
												});
											}}
											onApprove={(data, actions) => {
												return actions.order!.capture().then((details) => {
													onOrderCompleted(details);
												});
											}}
										/>
									)}
								</Box>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
	const { id = '' } = query;
	const session: any = await getSession({ req });

	if (!session)
		return {
			redirect: {
				destination: `/auth/login?p=orders/${id}`,
				permanent: false,
			},
		};

	const order = await dbOrders.getOrderById(id.toString());

	if (!order)
		return {
			redirect: {
				destination: `/orders/history`,
				permanent: false,
			},
		};

	if (order.user !== session.user._id)
		return {
			redirect: {
				destination: `/orders/history`,
				permanent: false,
			},
		};

	return {
		props: {
			order,
		},
	};
};

export default OrderPage;
