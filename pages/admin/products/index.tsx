/** @format */
import { CategoryOutlined } from '@mui/icons-material';
import { Box, Card, CircularProgress, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { NextPage } from 'next';
import Image from 'next/image';
import NextLink from 'next/link';
import useSWR from 'swr';

import { AdminLayout } from '../../../components/layouts';
import { IProduct } from '../../../interfaces';

const columns: GridColDef[] = [
	{
		field: 'img',
		headerName: 'Imagen',
		renderCell: ({ row }: GridValueGetterParams) => {
			return (
				<a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
					<Card>
						<Image src={`/products/${row.img}`} alt={row.title} width={100} height={100} />
					</Card>
				</a>
			);
		},
	},
	{
		field: 'title',
		headerName: 'Title',
		width: 250,
		renderCell: ({ row }: GridValueGetterParams) => {
			return (
				<NextLink href={`/admin/products/${row.slug}`} passHref>
					<Link underline='always'>{row.title}</Link>
				</NextLink>
			);
		},
	},
	{
		field: 'gender',
		headerName: 'Género',
	},
	{
		field: 'type',
		headerName: 'Tipo',
	},
	{
		field: 'inStock',
		headerName: 'Inventario',
		align: 'center',
	},
	{
		field: 'price',
		headerName: 'Precio',
		align: 'center',
	},
	{
		field: 'sizes',
		headerName: 'Tallas',
		width: 250,
	},
];

const ProductsPage: NextPage = () => {
	const { data, error } = useSWR<IProduct[]>('/api/admin/products');

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

	const rows = data!.map((product: IProduct) => ({
		id: product._id,
		img: product.images[0],
		title: product.title,
		gender: product.gender,
		type: product.type,
		inStock: product.inStock,
		price: product.price,
		sizes: product.sizes.join(', '),
		slug: product.slug,
	}));

	return (
		<AdminLayout
			title={`Productos (${data?.length || 0})`}
			subtitle={'Mantenimiento de productos'}
			icon={<CategoryOutlined />}>
			<Grid container className='fadeIn'>
				<Grid item xs={12} sx={{ height: 650, width: '100%' }}>
					<DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
				</Grid>
			</Grid>
		</AdminLayout>
	);
};

export default ProductsPage;
