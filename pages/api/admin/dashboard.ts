/** @format */
import { db } from '../../../database';
import { Order, Product, User } from '../../../models';

import type { NextApiRequest, NextApiResponse } from 'next';
type Data = {
	numberOfOrders: number;
	paidOrders: number; // isPaid: true
	notPaidOrders: number;
	numberOfClients: number; // role: client
	numberOfProducts: number; //
	productsWithNoInventory: number; // 0
	lowInventory: number; // Productos con 10 o menos en stock.
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	await db.connect();

	const [
		numberOfOrders,
		paidOrders,
		numberOfClients,
		numberOfProducts,
		productsWithNoInventory,
		lowInventory,
	] = await Promise.all([
		Order.count(),
		Order.find({ isPaid: true }).count(),
		User.find({ role: 'client' }).count(),
		Product.count(),
		Product.find({ inStock: 0 }).count(),
		Product.find({ inStock: { $lte: 10 } }).count(),
	]);

	await db.disconnect();

	return res.status(200).json({
		numberOfOrders,
		paidOrders,
		numberOfClients,
		numberOfProducts,
		productsWithNoInventory,
		lowInventory,
		notPaidOrders: numberOfOrders - paidOrders,
	});
}
