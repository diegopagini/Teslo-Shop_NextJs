/** @format */
import { PeopleOutlineOutlined } from '@mui/icons-material';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { NextPage } from 'next';
import useSWR from 'swr';

import { AdminLayout } from '../../components/layouts';
import { IUser } from '../../interfaces';

const UsersPage: NextPage = () => {
	const { data, error } = useSWR<IUser[]>('/api/admin/users');

	if (!error && !data) {
		return (
			<Box height='100vh' display='flex' justifyContent='center' className='fadeIn'>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		console.log(error);
		return <Typography>Error al cargar la información</Typography>;
	}

	const columns: GridColDef[] = [
		{
			field: 'email',
			headerName: 'Correo',
			width: 250,
		},
		{
			field: 'name',
			headerName: 'Nombre completo',
			width: 300,
		},
		{
			field: 'role',
			headerName: 'Rol',
			width: 300,
		},
	];

	const rows = data!.map((user: IUser) => ({
		id: user._id,
		email: user.email,
		name: user.name,
		role: user.role,
	}));

	return (
		<AdminLayout
			title={'Usuarios'}
			subtitle={'Mantenimiento de usuarios'}
			icon={<PeopleOutlineOutlined />}>
			<Grid container className='fadeIn'>
				<Grid item xs={12} sx={{ height: 650, width: '100%' }}>
					<DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
				</Grid>
			</Grid>
		</AdminLayout>
	);
};

export default UsersPage;
