"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, setDoc } from "@/lib/firebase";
import { doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/check-auth", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          router.push("/dashboard");
        }
      } catch (err) {
        console.error("Failed to check authentication:", err);
      }
    };

    checkAuth();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError("Login failed: " + (data.error || "Unknown error"));
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("Login failed: " + (err?.message || "Unknown error"));
    }
  };

  const handleSignupForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/OTP-Code", {
        method: "POST",
        body: JSON.stringify({ phone: form.phone }),
      });

      const data = await res.json();
      if (data.success) {
        setServerOtp(data.otp);
        setStep("otp");
      } else {
        setError("Failed to send verification code");
      }
    } catch (err) {
      setError("Error sending verification code");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp !== serverOtp) {
      setError("Incorrect verification code");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await updateProfile(userCred.user, {
        displayName: `${form.firstName} ${form.lastName}`,
      });

      await setDoc(doc(db, "users", userCred.user.uid), {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        createdAt: new Date().toISOString(),
      });

      router.push("/dashboard");
    } catch (err) {
      setError("Signup failed: " + err.message);
    }
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center bg-[#1B1D24] p-4"
      style={{ height: `calc(100vh - 60px)` }}
    >
      <div className="bg-[#5D9D0B] p-4 flex flex-col items-center gap-4 justify-center rounded-2xl">
        <h2 className="text-2xl text-white">
          {mode === "login" ? "Log In" : "Sign Up"}
        </h2>

        {error && <p>{error}</p>}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-4 rounded-xl">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-[#365A08] text-white py-2 rounded-md hover:scale-105 transition"
            >
              Log In
            </button>
          </form>
        )}
        {mode === "signup" && step === "form" && (
          <form
            onSubmit={handleSignupForm}
            className="space-y-4 rounded-xl shadow-md max-w-[500px]"
          >
            <input
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-[#365A08] text-white py-2 rounded-md hover:scale-105 transition"
            >
              Send Verification Code
            </button>
          </form>
        )}
        {mode === "signup" && step === "otp" && (
          <form
            onSubmit={handleVerifyOtp}
            className="space-y-4 rounded-xl shadow-md"
          >
            <p className="text-gray-700">Enter the code sent to your phone:</p>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Verification Code"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-[#365A08] text-white py-2 rounded-md hover:scale-105 transition"
            >
              Verify Code
            </button>
          </form>
        )}
        <div className="flex items-center mt-4">
          {mode === "signup" ? (
            <div className="flex items-center gap-3">
              <p>Already have an account?</p>
              <button
                onClick={() => {
                  setMode("login");
                  setStep("form");
                }}
                className="cursor-pointer"
              >
                Log In
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <p>Don't have an account?</p>
              <button
                onClick={() => {
                  setMode("signup");
                  setStep("form");
                }}
                className="cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
