/** @format */
import Head from 'next/head';
import React, { FC } from 'react';

import { Navbar } from '../ui';

interface Props {
	title: string;
	pageDescription: string;
	imageFullUrl?: string;
	children?: JSX.Element[];
}

export const ShopLayout: FC<Props> = ({
	children,
	title,
	pageDescription,
	imageFullUrl,
}) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='description' content={pageDescription} />
				<meta name='og:title' content={title} />
				<meta name='og:description' content={pageDescription} />
				{imageFullUrl && <meta name='og:image' content={imageFullUrl} />}
			</Head>

			<nav>
				<Navbar></Navbar>
			</nav>

			{/* TODO: Sidebar */}

			<main
				style={{
					margin: '80px auto',
					maxWidth: '1440px',
					padding: '0px 30px',
				}}>
				{children}
			</main>
			<footer>{/* TODO: footer */}</footer>
		</>
	);
};
