/** @format */
import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';

import { ShopLayout } from '../../components/layouts';
import { jwt } from '../../utils';

const AdressPage: NextPage = () => {
	return (
		<ShopLayout title='Dirección' pageDescription='Confirmar dirección del destino'>
			<Typography variant='h1' component='h1'>
				Dirección
			</Typography>
			<Grid container spacing={2} sx={{ mt: 2 }}>
				<Grid item xs={12} sm={6}>
					<TextField label='Nombre' variant='filled' fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label='Apellido' variant='filled' fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label='Dirección' variant='filled' fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label='Dirección 2 (opcional)' variant='filled' fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth>
						<Select variant='filled' label='País' value={1}>
							<MenuItem value={1}>Costa Rica</MenuItem>
							<MenuItem value={2}>Honduras</MenuItem>
							<MenuItem value={3}>El Salvador</MenuItem>
							<MenuItem value={4}>México</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label='Código Postal' variant='filled' fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label='Ciudad' variant='filled' fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label='Teléfono' variant='filled' fullWidth />
				</Grid>
			</Grid>

			<Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
				<Button color='secondary' className='circular-btn' size='large'>
					Revisar Orden
				</Button>
			</Box>
		</ShopLayout>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
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
				destination: '/auth/login?p=/checkout/address',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default AdressPage;
