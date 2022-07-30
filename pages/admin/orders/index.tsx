/** @format */
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Box, Chip, CircularProgress, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { NextPage } from 'next';
import useSWR from 'swr';

import { AdminLayout } from '../../../components/layouts';
import { IOrder, IUser } from '../../../interfaces';

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'Orden ID',
		width: 250,
	},
	{
		field: 'email',
		headerName: 'Correo',
		width: 250,
	},
	{
		field: 'name',
		headerName: 'Nombre Completo',
		width: 250,
	},
	{
		field: 'total',
		headerName: 'Monto total',
		width: 200,
	},
	{
		field: 'isPaid',
		headerName: 'Pagada',
		renderCell: ({ row }: GridValueGetterParams) => {
			return row.isPaid ? (
				<Chip variant='outlined' label='Pagada' color='success' />
			) : (
				<Chip variant='outlined' label='Pendiente' color='error' />
			);
		},
		width: 150,
	},
	{
		field: 'noProducts',
		headerName: 'No. Productos',
		align: 'center',
		width: 150,
	},
	{
		field: 'check',
		headerName: 'Ver orden',
		renderCell: ({ row }: GridValueGetterParams) => {
			return (
				<a href={`/admin/orders/${row.id}`} target='_blank' rel='noreferrer'>
					Ver orden
				</a>
			);
		},
	},
	{
		field: 'createdAt',
		headerName: 'Creada en',
		width: 200,
	},
];

const OrdersPage: NextPage = () => {
	const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

	if (!error && !data) {
		return (
			<Box
				height='100vh'
				display='flex'
				justifyContent='center'
				alignItems='center'
				className='fadeIn'>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		console.log(error);
		return <Typography>Error al cargar la información</Typography>;
	}

	const rows = data!.map((order: IOrder) => ({
		id: order._id,
		email: (order.user as IUser).email,
		name: (order.user as IUser).name,
		total: order.total,
		isPaid: order.isPaid,
		noProducts: order.numberOfItems,
		createdAt: order.createdAt,
	}));

	return (
		<AdminLayout
			title={'Ordenes'}
			subtitle={'Mantenimiento de ordenes'}
			icon={<ConfirmationNumberOutlined />}>
			<Grid container className='fadeIn'>
				<Grid item xs={12} sx={{ height: 650, width: '100%' }}>
					<DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
				</Grid>
			</Grid>
		</AdminLayout>
	);
};

export default OrdersPage;
