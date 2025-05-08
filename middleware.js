// import { NextResponse } from "next/server";
// import { verifyJWT } from "@/lib/jwt";

// export async function middleware(request) {
//   const token = request.cookies.get("token")?.value; // 👈 تغییر اینجا

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   const valid = await verifyJWT(token);

//   if (!valid) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/quiz/:path*"],
// };
