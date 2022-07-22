/** @format */
import Cookie from 'js-cookie';
import { FC, useEffect, useReducer } from 'react';

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

	useEffect(() => {
		const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
		dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
	}, []); // Si no se tienen dependencias se ejecuta una única vez.

	useEffect(() => {
		Cookie.set('cart', JSON.stringify(state.cart));
	}, [state.cart]);

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
