import "server-only";

import { NextRequest } from "next/server";

// Route protection
export function isRouteProtected(
  protectedRoutes: string[],
  request: NextRequest,
): boolean {
  const { nextUrl } = request;

  const routeProtected = protectedRoutes.some((protectedRoute) => {
    if (protectedRoute === nextUrl.pathname) {
      return true;
    }
  });

  return routeProtected;
}

export function isFormationRouteProtected(request: NextRequest): boolean {
  const { nextUrl } = request;
  const nextUrlPathname = nextUrl.pathname;

  if (
    nextUrlPathname.startsWith("/formation/part-") ||
    nextUrlPathname.startsWith("/formation/schedule-")
  ) {
    return true;
  }

  return false;
}
