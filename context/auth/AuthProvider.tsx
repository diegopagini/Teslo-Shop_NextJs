/** @format */
import { FC, useReducer } from 'react';

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

	return (
		<AuthContext.Provider
			value={{
				...state,
				// Methods
			}}>
			{children}
		</AuthContext.Provider>
	);
};
