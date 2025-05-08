// src/app/api/check-auth/route.ts
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";

export async function GET() {
  const Cookies = await cookies();
  const token = Cookies.get("token")?.value;

  if (!token) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
    });
  }

  const payload = await verifyJWT(token);

  if (!payload) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
    });
  }

  return new Response(JSON.stringify({ authenticated: true }), { status: 200 });
}
