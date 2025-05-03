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
        alert("Gagal login ke Internet Identity!");
      },
    });
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="text-center text-white px-6 py-12 max-w-lg mx-auto bg-opacity-70 backdrop-blur-lg rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Selamat Datang di Aplikasi Kontrak Digital</h1>
        <p className="text-lg mb-6">
          Dengan menggunakan Internet Identity, Anda dapat menandatangani kontrak digital secara aman dan terpercaya.
        </p>
        <button
          onClick={handleLogin}
          className="bg-indigo-600 px-8 py-3 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition duration-300"
        >
          Login dengan Internet Identity
        </button>
      </div>
    </main>
  );
}
