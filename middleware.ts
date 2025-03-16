import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Create Supabase client using middleware client instead of pages client
  const supabase = createMiddlewareClient({
    req: request,
    res: response,
  });

  // Get session
  const { data: { session }, error } = await supabase.auth.getSession();

  if (!session || error) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Check if the user is an admin
  const { data: admin, error: adminError } = await supabase
    .from("admin")
    .select("*")
    .eq("user_id", session.user.id)
    .single();

  if (!admin || adminError) {
    return NextResponse.redirect(new URL("/not-authorized", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"], // Protect all /admin pages
};