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
	email: string;
	password: string;
}

const LoginPage: NextPage = () => {
	const { loginUser } = useContext(AuthContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>(); // manejador de formularios de react-hook-form
	const router = useRouter();

	const [showError, setShowError] = useState(false);

	const onLoginUser = async ({ email, password }: FormData) => {
		setShowError(false);

		// const isValidLogin = await loginUser(email, password);

		// if (!isValidLogin) {
		// 	setShowError(true);
		// 	setTimeout(() => {
		// 		setShowError(false);
		// 	}, 3000);
		// 	return;
		// }

		// const destination = router.query.p?.toString() || '/';
		// router.replace(destination); // Replace reemplaza la pagina donde se econtraba por la nueva
		// // En cambio push lo envia a la nueva y guarda en el historial la anterior.

		await signIn('credentials', {
			email,
			password,
		});
	};

	return (
		<AuthLayout title='Ingresar'>
			<form onSubmit={handleSubmit(onLoginUser)} noValidate>
				<Box sx={{ width: 350, padding: '10px 20px' }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant='h1' component='h1'>
								Iniciar Sesión
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
								{...register('email', {
									required: 'Este campo es requerido',
									validate: (value: string) => validations.isEmail(value),
								})}
								label='Correo'
								type='email'
								variant='filled'
								fullWidth
								error={!!errors.email}
								helperText={errors.email?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								{...register('password', {
									required: 'Este campo es requerido',
									minLength: { value: 6, message: 'Mínimo 6 caracteres' },
								})}
								label='Contraseña'
								type='password'
								variant='filled'
								fullWidth
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
								Ingresar
							</Button>
						</Grid>

						<Grid item xs={12} display='flex' justifyContent='end'>
							<NextLink
								href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}
								passHref>
								<Link underline='always'>¿No tienes cuenta aún?</Link>
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

export default LoginPage;
