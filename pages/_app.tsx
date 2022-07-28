/** @format */
import '../styles/globals.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';

import { AuthProvider, CartProvider, UiProvider } from '../context';
import { lightTheme } from '../themes/light-theme';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps | any) {
	return (
		<SessionProvider>
			<PayPalScriptProvider
				options={{
					'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
				}}>
				<SWRConfig
					value={{
						fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()), // SWR config with fetch.
					}}>
					<AuthProvider>
						<CartProvider>
							<UiProvider>
								<ThemeProvider theme={lightTheme}>
									<CssBaseline />
									<Component {...pageProps} />
								</ThemeProvider>
							</UiProvider>
						</CartProvider>
					</AuthProvider>
				</SWRConfig>
			</PayPalScriptProvider>
		</SessionProvider>
	);
}

export default MyApp;
