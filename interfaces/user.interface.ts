/** @format */

export interface IUser {
	_id: string;
	name: string;
	email: string;
	password?: string;
	role: string; // admin, client, super-user, SEO
	createdAt?: string;
	updatedAt?: string;
}
