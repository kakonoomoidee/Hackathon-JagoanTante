// eslint-disable
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthClient } from "@dfinity/auth-client";

export default function LandingPage() {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [principal, setPrincipal] = useState<string | null>(null);
  const router = useRouter();

  // Cek staus saa halamann dimuat
  useEffect(() => {
    const checkAuth = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);

      // Cek apakah pengguna sudah terautentikasi
      const isAuth = await client.isAuthenticated();
      if (isAuth) {
        const identity = client.getIdentity();
        setPrincipal(identity.getPrincipal().toString());
        router.push("/dashboard"); // Arahkan ke halaman dashboard jika sudah login
      }
    };

    checkAuth();
  }, []);

  // login dengan Internet Identity
  const handleLogin = async () => {
    if (!authClient) {
      alert("AuthClient belum siap!");
      return;
    }


    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        const principalId = identity.getPrincipal().toString();
        setPrincipal(principalId);
        console.log("User Principal ID:", principalId);

        // Simpan principal ke localStorage agar bisa dipakai di halaman lain
        localStorage.setItem("principal", principalId);

        // Setelah login sukses, arahkan ke halaman home
        router.push("/dashboard");
      },
      onError: (err) => {
        console.error("Login error:", err);
        alert("Failed to log in to Internet Identity!");
      },
    });
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#00ffe055_1px,transparent_1px)] [background-size:24px_24px] z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#020409] to-[#0f172a] opacity-80 z-0" />

      {/* Header */}
      <header className="relative z-10 w-full px-8 py-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center gap-2">
          <img src="/acta_logo.png" alt="ACTA Logo" className="h-8 w-auto" />
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 flex-1 px-6 py-16 flex items-center justify-center">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-20">
          {/* Left Section */}
          <div className="flex-1 space-y-8">
            <h1 className="text-5xl font-bold leading-tight">
              Welcome to <br />
              <span className="text-cyan-400">ACTA</span>
            </h1>
            <p className="text-lg text-gray-300">
              Acta is a digital contract platform built on Internet Computer,
              enabling secure, transparent, and permanent electronic signatures using blockchain technology.
            </p>
            <p className="text-gray-400 text-md">
              Internet Identity is used for secure authentication. Signing and verification are handled via blockchain and crypto wallets for full decentralization.
            </p>

            <button
              onClick={handleLogin}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition"
            >
              Get Started with Internet Identity →
            </button>
          </div>

          {/* Right Section - Illustration */}
          <div className="flex-1 relative">
            <img
              src="/acta-illustration.png"
              alt="ACTA Digital Illustration"
              className="w-[500px] drop-shadow-[0_0_60px_#00ffff44]"
              style={{
                animation: "pulse 4s ease-in-out infinite"
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center text-gray-500 text-sm py-6 border-t border-gray-800">
        © {new Date().getFullYear()} ACTA. All rights reserved.
      </footer>
    </main>
  );
}
