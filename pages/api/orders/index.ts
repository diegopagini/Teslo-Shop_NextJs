/** @format */
import { getSession } from 'next-auth/react';

import { db } from '../../../database';
import { IOrder, IOrderItem } from '../../../interfaces';
import { Order, Product } from '../../../models';

import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
	| {
			message: string;
	  }
	| IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'POST':
			return createOrder(req, res);

		default:
			return res.status(400).json({ message: 'Bad request' });
	}
}
const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { orderItems, total } = req.body as IOrder;

	// Verificar que tengamos un usuario.
	const session: any = await getSession({ req });

	if (!session)
		return res.status(401).json({ message: 'Debe de estar autenticado para hacer esto' });

	// Crear un arreglo con los productos que la persona quiere.
	const productsIds: string[] = orderItems.map((item: IOrderItem) => item._id);
	await db.connect();
	const dbProducts = await Product.find({ _id: { $in: productsIds } }); // Para buscar todos los productos en mi DB.

	try {
		const subTotal = orderItems.reduce((prev, current: IOrderItem) => {
			const currentPrice = dbProducts.find((prod) => prod.id === current._id)?.price;
			if (!currentPrice) throw new Error('Verifique el carrito de nuevo, producto no existe');
			return currentPrice * current.quantity + prev;
		}, 0); // De esta forma nos aseguramos que el subtotal este calculado del lado del backend.
		const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
		const backendTotal = subTotal * (taxRate + 1);

		if (total !== backendTotal) throw new Error('El total no cuadra con el monto');

		// En este punto todo esta ok.
		const userId = session.user._id;
		const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
		newOrder.total = Math.round(newOrder.total * 100) / 100;
		await newOrder.save();
		await db.disconnect();

		return res.status(201).json(newOrder);
	} catch (error: any) {
		await db.disconnect();
		console.log(error);
		return res.status(400).json({ message: error.message || 'Revisar logs del servidor' });
	}
};
