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

	const addProductToCar = (product: ICartProduct) => {
		const productInCart = state.cart.some((value: ICartProduct) => value._id === product._id);
		if (!productInCart)
			return dispatch({
				type: '[Cart] - Update products in cart',
				payload: [...state.cart, product],
			});

		const productInCartButDifferentSize = state.cart.some(
			(value: ICartProduct) => value._id === product._id && value.size === product.size
		);
		if (!productInCartButDifferentSize)
			return dispatch({
				type: '[Cart] - Update products in cart',
				payload: [...state.cart, product],
			});

		// Acumular
		const updatedProducts = state.cart.map((value: ICartProduct) => {
			if (value._id !== product._id) return value;
			if (value.size !== product.size) return value;
			// Entonces actualizar la cantidad
			value.quantity += product.quantity;

			return value;
		});

		dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });
	};

	return (
		<CartContext.Provider
			value={{
				...state,
				addProductToCar,
			}}>
			{children}
		</CartContext.Provider>
	);
};
