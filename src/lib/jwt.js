import { SignJWT } from "jose";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode("secret");

export async function generateJWT(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);
}


export async function verifyJWT(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
}