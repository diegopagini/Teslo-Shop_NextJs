/** @format */
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect, useReducer } from 'react';

import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';

export interface AuthState {
	isLoggedIn: boolean;
	user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
	isLoggedIn: false,
	user: undefined,
};

interface Props {
	children: JSX.Element;
}
export const AuthProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
	const router = useRouter();
	const { data, status } = useSession();

	useEffect(() => {
		if (status === 'authenticated') {
			dispatch({ type: '[Auth] - Login', payload: data!.user as IUser });
		}
	}, [data, status]);

	// useEffect(() => {
	// 	checkToken();
	// }, []); // Si no hay ninguna dependencia se disparará una única vez.

	// const checkToken = async () => {
	// 	if (!Cookies.get('token')) return;

	// 	try {
	// 		const { data } = await tesloApi.get('/user/validate-token');
	// 		const { token, user } = data;
	// 		Cookies.set('token', token);
	// 		dispatch({ type: '[Auth] - Login', payload: user });
	// 	} catch (error) {
	// 		Cookies.remove('token');
	// 	}
	// };

	const loginUser = async (email: string, password: string): Promise<boolean> => {
		try {
			const { data } = await tesloApi.post('/user/login', { email, password });
			const { token, user } = data;
			Cookies.set('token', token);
			dispatch({ type: '[Auth] - Login', payload: user });
			return true;
		} catch (error) {
			return false;
		}
	};

	const registerUser = async (
		name: string,
		email: string,
		password: string
	): Promise<{ hasError: boolean; message?: string }> => {
		try {
			const { data } = await tesloApi.post('/user/register', { name, email, password });
			const { token, user } = data;
			Cookies.set('token', token);
			dispatch({ type: '[Auth] - Login', payload: user });

			return {
				hasError: false,
			};
		} catch (err) {
			if (axios.isAxiosError(err)) {
				const error = err as AxiosError;
				return {
					hasError: true,
					message: error.message,
				};
			}

			return {
				hasError: true,
				message: 'Error en registro.',
			};
		}
	};

	const logout = () => {
		Cookies.remove('cart');
		Cookies.remove('firstName');
		Cookies.remove('lastName');
		Cookies.remove('address');
		Cookies.remove('address2');
		Cookies.remove('zip');
		Cookies.remove('city');
		Cookies.remove('country');
		Cookies.remove('phone');
		// Cookies.remove('token');
		signOut();
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				// Methods
				loginUser,
				registerUser,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
