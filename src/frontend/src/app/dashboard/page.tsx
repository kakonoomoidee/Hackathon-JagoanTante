"use client";
import { AuthClient } from "@dfinity/auth-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [principal, setPrincipal] = useState<string | null>(null);
  const router = useRouter();

  // Ambil principal dari localStorage
  useEffect(() => {
    const storedPrincipal = localStorage.getItem("principal");
    if (storedPrincipal) {
      setPrincipal(storedPrincipal);
    } else {
      // Jika principal tidak ada di localStorage, arahkan kembali ke halaman landing
      router.push("/");
    }
  }, [router]);


  const handleLogout = async () => {
    const client = await AuthClient.create();
    await client.logout(); // Logout dari Internet Identity
  
    localStorage.removeItem("principal"); // Bersihkan data lokal
    setPrincipal(null); // Reset state
    router.push("/"); // Redirect ke halaman landing
  };
  

  return (
    <main className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 min-h-screen flex flex-col items-center justify-center text-white">
    <div className="w-full max-w-4xl p-8 bg-opacity-90 backdrop-blur-lg rounded-xl shadow-lg">
      <h1 className="text-4xl font-semibold text-center mb-6">Dashboard</h1>
      <div className="bg-white text-gray-800 rounded-lg p-6 shadow-md">
        {principal ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Selamat datang, {principal}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-lg shadow-xl hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-semibold mb-3">Kontrak Digital</h3>
                <p>Kelola dan tandatangani kontrak secara digital dengan aman.</p>
              </div>
              <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-lg shadow-xl hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-semibold mb-3">Riwayat Kontrak</h3>
                <p>Melihat riwayat kontrak digital yang telah diselesaikan.</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 rounded-lg shadow-xl hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-semibold mb-3">Pengaturan Akun</h3>
                <p>Kelola pengaturan akun Anda seperti profil dan preferensi.</p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  </main>
  );
}
