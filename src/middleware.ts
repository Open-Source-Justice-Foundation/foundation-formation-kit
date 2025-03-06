export { auth as middleware } from "~/auth";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - public
     * - images
     * - web-app-manifest-.*
     * - $ (homepage)
     * - api (API routes)
     * - error
     * - apple-icon.png
     * - favicon.ico (favicon file)
     * - icon.svg
     * - manifest.webmanifest
     * - not-found
     * - opengraph-image.png
     * - robots.txt
     * - sitemap.xml
     * - twitter-image.png
     */
    "/((?!_next/static|_next/image|public|images|web-app-manifest-.*|$|api|error|apple-icon.png|favicon.ico|icon.svg|manifest.webmanifest|not-found|opengraph-image.png|robots.txt|sitemap.xml|twitter-image.png).*)",
  ],
};
