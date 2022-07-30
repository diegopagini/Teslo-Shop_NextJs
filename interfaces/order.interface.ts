/** @format */
import { ISize } from './products.interface';
import { IUser } from './user.interface';

export interface IOrder {
	_id?: string;
	user?: IUser | string;
	orderItems: IOrderItem[];
	shippingAddress: ShippingAddress;
	paymentResult?: string;
	numberOfItems: number;
	subTotal: number;
	total: number;
	tax: number;
	isPaid: boolean;
	paidAt?: string;
	transactionId?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface IOrderItem {
	_id: string;
	title: string;
	size: ISize;
	quantity: number;
	slug: string;
	image: string;
	price: number;
	gender: string;
}

export interface ShippingAddress {
	firstName: string;
	lastName: string;
	address: string;
	address2?: string;
	zip: string;
	city: string;
	country: string;
	phone: string;
}
