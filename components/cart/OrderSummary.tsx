/** @format */
import { Grid, Typography } from '@mui/material';

export const OrderSummary = () => {
	return (
		<Grid container>
			<Grid item xs={6}>
				<Typography>No. Productos</Typography>
			</Grid>

			<Grid item xs={6} display='flex' justifyContent='end'>
				<Typography>3 items</Typography>
			</Grid>

			<Grid item xs={6}>
				<Typography>Subtotal</Typography>
			</Grid>

			<Grid item xs={6} display='flex' justifyContent='end'>
				<Typography>$155,03</Typography>
			</Grid>

			<Grid item xs={6}>
				<Typography>Impuestos (15%)</Typography>
			</Grid>

			<Grid item xs={6} display='flex' justifyContent='end'>
				<Typography>$55,03</Typography>
			</Grid>

			<Grid item xs={6}>
				<Typography variant='subtitle1' sx={{ mt: 1 }}>
					Total:
				</Typography>
			</Grid>

			<Grid item xs={6} display='flex' justifyContent='end' sx={{ mt: 1 }}>
				<Typography variant='subtitle1'>$255,03</Typography>
			</Grid>
		</Grid>
	);
};
