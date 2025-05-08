"use client";

import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        console.log(currentUser);
        
        setFirebaseUser(currentUser);
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        } else {
          setUserData(null);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    // حذف توکن
    await fetch("/api/logout", {
      method: "POST",
    });

    // signOut از Firebase
    await signOut(auth);

    router.push("/login");
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center bg-[#1B1D24] p-4"
      style={{ height: `calc(100vh - 60px)` }}
    >
      <div className="bg-[#5D9D0B] p-6 rounded-2xl shadow-lg text-white max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {firebaseUser && userData ? (
          <div className="space-y-2">
            <p>
              <span className="font-semibold">First Name:</span>{" "}
              {userData.firstName}
            </p>
            <p>
              <span className="font-semibold">Last Name:</span>{" "}
              {userData.lastName}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {userData.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {userData.phone}
            </p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}

        <button
          className="w-full bg-[#365A08] text-white py-2 rounded-md hover:scale-105 transition"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
