/** @format */
import { db, SHOP_CONSTANTS } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { message: string } | IProduct[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return getProducts(req, res);

		default:
			return res.status(400).json({
				message: 'Bad request',
			});
	}
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { gender = 'all' } = req.query;

	let condition = {};
	if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
		condition = { gender };
	}

	await db.connect();

	/**
	 * select en mongodb es para seleccionar las propiedades que queremos traer, con "-" elejimos las que queremos quitar.
	 */
	const products = await Product.find(condition)
		.select('title images price inStock slug -_id')
		.lean();
	/**
	 * lean también es para traer solo la información necesaria.
	 * De esta forma tenemos una llamada ligeramente más pequeña.
	 */
	await db.disconnect();

	const updatedProducts = products.map((product) => {
		product.images = product.images.map((img: string) =>
			img.includes('http') ? img : `${process.env.HOST_NAME}products/${img}`
		);

		return product;
	});

	return res.status(200).json(updatedProducts);
};
