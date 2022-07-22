/** @format */
import { FC, useReducer } from 'react';

import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';

export interface CartState {
	cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
	cart: [],
};

interface Props {
	children: JSX.Element;
}
export const CartProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

	return (
		<CartContext.Provider
			value={{
				...state,
			}}>
			{children}
		</CartContext.Provider>
	);
};
