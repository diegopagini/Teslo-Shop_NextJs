/** @format */
import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import tesloApi from '../../api/tesloApi';
import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';

interface FormData {
	name: string;
	email: string;
	password: string;
}

const RegisterPage: NextPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const [showError, setShowError] = useState(false);

	const onRegisterForm = async ({ name, email, password }: FormData) => {
		setShowError(false);

		try {
			const { data } = await tesloApi.post('/user/register', { name, email, password });
			const { token, user } = data;
			console.log({ token, user });
		} catch (error) {
			setShowError(true);
			setTimeout(() => {
				setShowError(false);
			}, 3000);
			console.log('Error en las credenciales');
		}
	};

	return (
		<AuthLayout title='Ingresar'>
			<form onSubmit={handleSubmit(onRegisterForm)} noValidate>
				<Box sx={{ width: 350, padding: '10px 20px' }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant='h1' component='h1'>
								Crear cuenta
							</Typography>

							<Chip
								label='No reconocemos ese usario / contraseña'
								color='error'
								icon={<ErrorOutline />}
								className='fadeIn'
								sx={{ display: showError ? 'flex' : 'none' }}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								label='Nombre completo'
								variant='filled'
								fullWidth
								{...register('name', {
									required: 'Este campo es requerido',
									minLength: {
										value: 2,
										message: 'Mínimo 2 caracteres',
									},
								})}
								error={!!errors.name}
								helperText={errors.name?.message}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								label='correo'
								variant='filled'
								type='email'
								fullWidth
								{...register('email', {
									required: 'Este campo es requerido',
									validate: validations.isEmail, // Si el valor que envia el componente es el mismo que el de la función puede pasarse
									// solo la referencia
								})}
								error={!!errors.email}
								helperText={errors.email?.message}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								label='Contraseña'
								type='password'
								variant='filled'
								fullWidth
								{...register('password', {
									required: 'Este campo es requerido',
									minLength: { value: 6, message: 'Mínimo 6 caracteres' },
								})}
								error={!!errors.password}
								helperText={errors.password?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								color='secondary'
								className='circular-btn'
								size='large'
								fullWidth
								type='submit'>
								Crear cuenta
							</Button>
						</Grid>

						<Grid item xs={12} display='flex' justifyContent='end'>
							<NextLink href='/auth/login' passHref>
								<Link underline='always'>Ya tienes cuenta?</Link>
							</NextLink>
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
};

export default RegisterPage;
