/** @format */
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';

import type { NextPage } from 'next';

const WomenPage: NextPage = () => {
	const { products, isLoading } = useProducts(`/products?gender=women`);

	return (
		<ShopLayout
			title={'Tesla-Shop - Women'}
			pageDescription={'Encuentra los mejores productos de Teslo para ellas'}>
			<Typography variant='h1' component='h1'>
				Mujeres
			</Typography>

			<Typography variant='h2' sx={{ mb: 1 }}>
				Productos para ellas
			</Typography>

			{isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
		</ShopLayout>
	);
};

export default WomenPage;
