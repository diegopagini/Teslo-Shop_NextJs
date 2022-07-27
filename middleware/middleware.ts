/** @format */
import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest | any, event: NextFetchEvent) {
	// const { token = '' } = req.cookies;
	// try {
	// 	await jwt.isValidToken(token);
	// 	return NextResponse.next();
	// } catch (error) {
	// 	const requestedPage = req.page?.name;
	// 	return NextResponse.redirect(`/auth/login?p=${requestedPage}`);
	// }

	const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	if (!session) {
		const requestedPage = req.page?.name;
		return NextResponse.redirect(`/auth/login?p=${requestedPage}`);
	}

	return NextResponse.next();
}
