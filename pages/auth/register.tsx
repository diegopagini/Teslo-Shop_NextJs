/** @format */
import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import { getSession, signIn } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layouts';
import { AuthContext } from '../../context';
import { validations } from '../../utils';

interface FormData {
	name: string;
	email: string;
	password: string;
}

const RegisterPage: NextPage = () => {
	const router = useRouter();
	const { registerUser } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const [showError, setShowError] = useState(false);
	const [onErrorMessage, setOnErrorMessage] = useState('');

	const onRegisterForm = async ({ name, email, password }: FormData) => {
		setShowError(false);
		const { hasError, message } = await registerUser(name, email, password);

		if (hasError) {
			setShowError(true);
			setOnErrorMessage(message || '');
			setTimeout(() => {
				setShowError(false);
			}, 3000);
			return;
		}

		// router.replace('/');
		await signIn('credentials', { email, password });
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
							<NextLink
								href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}
								passHref>
								<Link underline='always'>Ya tienes cuenta?</Link>
							</NextLink>
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
	const session = await getSession({ req });

	const { p = '/' } = query;

	if (session) {
		return {
			redirect: {
				destination: p.toString(),
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default RegisterPage;
