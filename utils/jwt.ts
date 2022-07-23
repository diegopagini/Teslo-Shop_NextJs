/** @format */
import jwt from 'jsonwebtoken';

/**
 * Función para generar Tokens
 * @param {string} _id
 * @param {string} email
 * @returns string
 */

export const signToken = (_id: string, email: string) => {
	if (!process.env.JWT_SECRET_SEED) {
		throw new Error('No hay semilla de JWT - Revisar variables de entorno');
	}

	return jwt.sign(
		// payload
		{ _id, email },
		// seed
		process.env.JWT_SECRET_SEED,
		// options
		{
			expiresIn: '30d',
		}
	);
};
