import { NextResponse } from "next/server";
import { generateJWT } from "@/lib/jwt";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  try {
    // مرحله 1: ورود با Firebase Auth
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const firebaseUser = userCredential.user;

    // مرحله 2: خواندن اطلاعات تکمیلی از Firestore
    const userDocRef = doc(db, "users", firebaseUser.uid);
    const userSnap = await getDoc(userDocRef);

    if (!userSnap.exists()) {
      return NextResponse.json(
        { error: "کاربر در پایگاه داده یافت نشد" },
        { status: 404 }
      );
    }

    const userData = userSnap.data();

    // مرحله 3: ساخت JWT سفارشی
    const token = await generateJWT({
      email: firebaseUser.email,
    });

    // مرحله 4: ارسال توکن به عنوان کوکی HttpOnly
    const response = NextResponse.json({ success: true });
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "ورود ناموفق بود" }, { status: 401 });
  }
}
