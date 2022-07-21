/** @format */
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';

import type { NextPage } from 'next';

const MenPage: NextPage = () => {
	const { products, isLoading } = useProducts(`/products?gender=men`);

	return (
		<ShopLayout
			title={'Tesla-Shop - Man'}
			pageDescription={'Encuentra los mejores productos de Teslo para ellos'}>
			<Typography variant='h1' component='h1'>
				Hombres
			</Typography>

			<Typography variant='h2' sx={{ mb: 1 }}>
				Productos para ellos
			</Typography>

			{isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
		</ShopLayout>
	);
};

export default MenPage;
