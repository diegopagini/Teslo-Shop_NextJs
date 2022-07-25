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

/**
 * Función para validar Tokens
 * @param {string} token
 * @returns Promise<string>
 */
export const isValidToken = (token: string): Promise<string> => {
	if (!process.env.JWT_SECRET_SEED) {
		throw new Error('No hay semilla de JWT - Revisar variables de entorno');
	}

	if (token.length <= 10) {
		return Promise.reject('JWT no es válido');
	}

	return new Promise((resolve, reject) => {
		/**
		 * Recuperar los datos del JWT
		 */
		try {
			jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
				if (err) return reject('JWT no es válido');
				const { _id } = payload as { _id: string };
				resolve(_id);
			});
		} catch (error) {
			reject('JWT no es válido');
		}
	});
};
