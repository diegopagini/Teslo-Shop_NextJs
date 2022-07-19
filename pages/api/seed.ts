/** @format */
import { db, seeDatabase } from '../../database';
import { Product } from '../../models';

import type { NextApiRequest, NextApiResponse } from 'next';
type Data = {
	message: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (process.env.NODE_ENV === 'production') {
		return res.status(401).json({ message: 'No tiene acceso a ese API' });
	}

	await db.connect();

	await Product.deleteMany();
	await Product.insertMany(seeDatabase.initialData.products);

	await db.disconnect();

	res.status(200).json({ message: 'Proceso realizado correctamente' });
}
