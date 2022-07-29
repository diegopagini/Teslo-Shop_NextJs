/** @format */
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from '@mui/icons-material';
import { Grid } from '@mui/material';
import React from 'react';

import { SummaryTile } from '../../components/admin';
import { AdminLayout } from '../../components/layouts';

const DashboardPage = () => {
	return (
		<AdminLayout title='Dashboard' subtitle='Estadisticas generales' icon={<DashboardOutlined />}>
			<Grid container spacing={2}>
				<SummaryTile
					title={1}
					subtitle='Ordenes totales'
					icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} />}
				/>

				<SummaryTile
					title={2}
					subtitle='Ordenes pagadas'
					icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
				/>

				<SummaryTile
					title={3}
					subtitle='Ordenes pendientes'
					icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
				/>

				<SummaryTile
					title={4}
					subtitle='Clientes'
					icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
				/>

				<SummaryTile
					title={5}
					subtitle='Productos'
					icon={<GroupOutlined color='success' sx={{ fontSize: 40 }} />}
				/>

				<SummaryTile
					title={6}
					subtitle='Sin existencias'
					icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
				/>

				<SummaryTile
					title={7}
					subtitle='Bajo inventario'
					icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
				/>

				<SummaryTile
					title={8}
					subtitle='Actualizaciñon en:'
					icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
				/>
			</Grid>
		</AdminLayout>
	);
};

export default DashboardPage;
