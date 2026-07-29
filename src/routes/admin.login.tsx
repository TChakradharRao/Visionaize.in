/* eslint-disable prettier/prettier */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // simple static check for now; replace with server auth later
    if (user === "admin" && pass === "password") {
      localStorage.setItem("adminAuth", "true");
      // redirect to enquiries
      window.location.href = "/admin/enquiries";
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="mx-auto w-full max-w-xl p-6 border border-gray-200 rounded shadow mt-12 mb-8">
        <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
        {/* <p className="mb-6 text-sm text-gray-600"></p> */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input value={user} onChange={(e) => setUser(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-brand-navy text-white rounded">Sign in</button>
            {/* <Link to="/" className="text-sm text-blue-600">Back to site</Link> */}
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
