/** @format */
import { CreditCardOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces/order.interface';

interface Props {
	order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
	const { shippingAddress } = order;

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

			<Grid container>
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
								{!order.isPaid ? (
									<Chip
										sx={{ my: 2 }}
										label='Orden Pagada'
										variant='outlined'
										color='success'
										icon={<CreditScoreOutlined />}
									/>
								) : (
									<h1>Pagar</h1>
								)}
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
