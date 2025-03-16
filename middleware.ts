import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for the sign-in page itself
  if (pathname === "/auth/sign-in") {
    return NextResponse.next();
  }
  
  const response = NextResponse.next();
  
  // Create Supabase client using middleware client
  const supabase = createMiddlewareClient({
    req: request,
    res: response,
  });

  // Get session
  const { data: { session }, error } = await supabase.auth.getSession();

  console.log("Middleware session check:", { 
    hasSession: !!session, 
    error: error?.message,
    path: pathname
  });

  if (!session || error) {
    console.log("No session, redirecting to sign-in");
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // Get the user's uid from the session
  const uid = session.user.id;
  
  // Check if the user's uid matches any id in the admin table
  const { data: admin, error: adminError } = await supabase
    .from("admin")
    .select("*")
    .eq("id", uid)  // Compare uid with the id column
    .single();

  console.log("Admin check:", { 
    uid: uid,
    email: session.user.email,
    isAdmin: !!admin, 
    adminData: admin,
    error: adminError?.message 
  });

  if (!admin || adminError) {
    console.log("Not an admin, redirecting to sign-in");
    // Sign out the user if they're not an admin
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  console.log("Auth successful, proceeding to admin page");
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};