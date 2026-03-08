import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // Redirect authenticated users away from /login
        if (path.startsWith("/login")) {
            if (token) {
                // Admin or Staff goes to Dashboard
                if (token.role === "Admin" || token.role === "Staff") {
                    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
                }
                // Normal User goes to Home
                return NextResponse.redirect(new URL("/", req.url));
            }
            return null;
        }

        // Protect /admin routes
        if (path.startsWith("/admin")) {
            if (!token) {
                return NextResponse.redirect(new URL("/login", req.url));
            }
            if (token.role !== "Admin" && token.role !== "Staff") {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }

        return null;
    },
    {
        callbacks: {
            // The middleware function will only be invoked if this authorized callback returns true.
            // We return true always so the middleware can handle the logic and unauthenticated redirects.
            authorized: () => true,
        },
    }
);

export const config = {
    matcher: ["/admin/:path*", "/login"],
};
