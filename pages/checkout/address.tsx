/** @format */
import { Box, Button, FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material';
import Cookie from 'js-cookie';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { ShopLayout } from '../../components/layouts';
import { countries, jwt } from '../../utils';

type FormData = {
	firstName: string;
	lastName: string;
	address: string;
	address2: string;
	zip: string;
	city: string;
	country: string;
	phone: string;
};

// Cuando utilizamos funciones fuera de nuestro componente es para evitar que se reprosesen cada vez que react haga un cambio.
const getAddressFromCookies = (): FormData => {
	return {
		firstName: Cookie.get('firstName') || '',
		lastName: Cookie.get('lastName') || '',
		address: Cookie.get('address') || '',
		address2: Cookie.get('address2') || '',
		zip: Cookie.get('zip') || '',
		city: Cookie.get('city') || '',
		country: Cookie.get('country') || '',
		phone: Cookie.get('phone') || '',
	};
};

const AdressPage: NextPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: getAddressFromCookies(),
	});

	const router = useRouter();

	const onSubmitAddress = (data: FormData) => {
		Cookie.set('firstName', data.firstName);
		Cookie.set('lastName', data.lastName);
		Cookie.set('address', data.address);
		Cookie.set('address2', data.address2 || '');
		Cookie.set('zip', data.zip);
		Cookie.set('city', data.city);
		Cookie.set('country', data.country);
		Cookie.set('phone', data.phone);

		router.push('/checkout/summary');
	};

	return (
		<ShopLayout title='Dirección' pageDescription='Confirmar dirección del destino'>
			<form onSubmit={handleSubmit(onSubmitAddress)} noValidate>
				<Typography variant='h1' component='h1'>
					Dirección
				</Typography>
				<Grid container spacing={2} sx={{ mt: 2 }}>
					<Grid item xs={12} sm={6}>
						<TextField
							label='Nombre'
							variant='filled'
							fullWidth
							{...register('firstName', {
								required: 'Este campo es requerido',
							})}
							error={!!errors.firstName}
							helperText={errors.firstName?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label='Apellido'
							variant='filled'
							fullWidth
							{...register('lastName', {
								required: 'Este campo es requerido',
							})}
							error={!!errors.lastName}
							helperText={errors.lastName?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label='Dirección'
							variant='filled'
							fullWidth
							{...register('address', {
								required: 'Este campo es requerido',
							})}
							error={!!errors.address}
							helperText={errors.address?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label='Dirección 2 (opcional)'
							variant='filled'
							fullWidth
							{...register('address2')}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<TextField
								select
								variant='filled'
								label='País'
								defaultValue={'ESP'}
								{...register('country', {
									required: 'Este campo es requerido',
								})}
								error={!!errors.country}
								helperText={errors.country?.message}>
								{countries.map((country) => (
									<MenuItem value={country.code} key={country.code}>
										{country.name}
									</MenuItem>
								))}
							</TextField>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label='Código Postal'
							variant='filled'
							fullWidth
							{...register('zip', {
								required: 'Este campo es requerido',
							})}
							error={!!errors.zip}
							helperText={errors.zip?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label='Ciudad'
							variant='filled'
							fullWidth
							{...register('city', {
								required: 'Este campo es requerido',
							})}
							error={!!errors.city}
							helperText={errors.city?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label='Teléfono'
							variant='filled'
							fullWidth
							{...register('phone', {
								required: 'Este campo es requerido',
							})}
							error={!!errors.phone}
							helperText={errors.phone?.message}
						/>
					</Grid>
				</Grid>

				<Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
					<Button color='secondary' className='circular-btn' size='large' type='submit'>
						Revisar Orden
					</Button>
				</Box>
			</form>
		</ShopLayout>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// En versiones anteriores a la 12 de Next esta era la única forma de validad desde el lado del servidor.
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
