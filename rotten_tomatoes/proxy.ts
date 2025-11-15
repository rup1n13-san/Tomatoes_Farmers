import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { verifyTokenFromRequest } from './lib/jwt-verify';

const PUBLIC_ROUTES = ['/', '/auth/login', '/auth/register', '/client/movies'];

const PROTECTED_ROUTES = ['/profile', '/favorite'];

const ADMIN_ROUTES = ['/admin'];

function matchesRoute(pathname: string, routes: string[]): boolean {
	return routes.some((route) => {
		if (pathname === route) return true;

		if (pathname.startsWith(route + '/')) return true;
		return false;
	});
}

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const user = verifyTokenFromRequest(request);
	const isAuthenticated = !!user;

	if (matchesRoute(pathname, PUBLIC_ROUTES)) {
		console.log(`Public route, access granted`);
		if (matchesRoute(pathname, ['/auth/login', '/auth/register']) && isAuthenticated) {
			return NextResponse.redirect(new URL('/', request.url));
		} 
		return NextResponse.next();
	}

	if (matchesRoute(pathname, ADMIN_ROUTES)) {
		console.log(`Admin route detected`);

		if (!isAuthenticated) {
			console.log(`Not authenticated, redirecting to login`);
			return NextResponse.redirect(new URL('/auth/login', request.url));
		}

		if(!user.emailVerified){
			console.log("Verify email");
			return NextResponse.redirect(new URL('/verify-email', request.url));
		}

		if (user.role != 'admin') {
			console.log(user.role);
			return NextResponse.redirect(new URL('/unauthorize', request.url));
		}

		return NextResponse.next();
	}

	if (matchesRoute(pathname, PROTECTED_ROUTES)) {
		console.log(`Protected route detected`);

		if (!isAuthenticated) {
			console.log(`Not authenticated, redirecting to login`);
			return NextResponse.redirect(new URL('/auth/login', request.url));
		}

		if (!user.emailVerified) {
			console.log('Verify email');
			return NextResponse.redirect(new URL('/verify-email', request.url));
		}

		console.log(`Protected route, access granted`);
		return NextResponse.next();
	}

	console.log(`Unprotected route, access granted`);
	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
