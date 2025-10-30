"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [role, setRole] = useState("teacher");

  const handleLogin = () => {
    router.push(`/${role}`);
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-white p-6 rounded-lg shadow w-80 text-center">
        <h2 className="text-lg font-bold mb-4">Select Role for Demo</h2>
        <select
          className="border p-2 w-full rounded mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
          <option value="parent">Parent</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleLogin} className="bg-indigo-600 text-white w-full py-2 rounded">
          Enter Demo
        </button>
      </div>
    </div>
  );
}
