/** @format */
import { Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products';
import { initialData } from '../database/products';
import { IProduct } from '../interfaces/products.interface';

import type { NextPage } from 'next';
const Home: NextPage = () => {
	return (
		<ShopLayout
			title={'Tesla-Shop - Home'}
			pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
			<Typography variant='h1' component='h1'>
				Tienda
			</Typography>

			<Typography variant='h2' sx={{ mb: 1 }}>
				Todos los productos
			</Typography>

			<ProductList products={initialData.products as IProduct[]} />
		</ShopLayout>
	);
};

export default Home;
