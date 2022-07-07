/** @format */
import '../styles/globals.css';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { lightTheme } from '../themes/light-theme';

import type { AppProps } from 'next/app';
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={lightTheme}>
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
