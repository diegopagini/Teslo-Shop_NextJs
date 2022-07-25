/** @format */
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

import { dbUsers } from '../../../database';

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		// ...add more providers here

		Credentials({
			name: 'Custom Login',
			credentials: {
				email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com' },
				password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña' },
			},
			async authorize(credentials) {
				return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password); // ! significa que siempre va a
				// existir. Solo utilizarlo si estamos seguros de que así será.
			},
		}),
	],

	jwt: {
		// if using `NEXTAUTH_SECRET` env variable, we detect it, and you won't actually need to `secret`
	},

	// Callbacks
	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				token.accessToken = account.access_token;

				switch (account.type) {
					case 'credentials':
						token.user = user;
						break;

					case 'oauth':
						break;
				}
			}

			return token;
		},

		async session({ session, token, user }) {
			session.accessToken = token.accessToken;
			session.user = token.user as any;

			return session;
		},
	},
});
