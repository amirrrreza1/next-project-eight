import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "arazarioun83@gmail.com",
      subject: "Your Verification Code",
      html: `<>
        <h1>Hello There</h1>
        <h3>Please verify your account by entering the code below</h3>
        <p>Your Verification Code is ${otp}</p>
        <p>Please Don't Share this code with anyone</p>
      </>`,
    });

    return NextResponse.json({ success: true, otp });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}
