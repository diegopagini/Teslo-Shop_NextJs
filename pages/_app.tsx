/** @format */
import '../styles/globals.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { SWRConfig } from 'swr';

import { UiProvider } from '../context';
import { lightTheme } from '../themes/light-theme';

import type { AppProps } from 'next/app';
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig
			value={{
				fetcher: (resource, init) =>
					fetch(resource, init).then((res) => res.json()), // SWR config with fetch.
			}}>
			<UiProvider>
				<ThemeProvider theme={lightTheme}>
					<CssBaseline />
					<Component {...pageProps} />
				</ThemeProvider>
			</UiProvider>
		</SWRConfig>
	);
}

export default MyApp;
