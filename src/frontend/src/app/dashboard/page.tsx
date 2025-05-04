"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthClient } from "@dfinity/auth-client";
import { FaFileSignature } from 'react-icons/fa';
import Footer from '@/components/footer';

export default function Dashboard() {
  const [principal, setPrincipal] = useState<string | null>(null);
  const [contracts, setContracts] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"sign" | "signed">("sign");
  const router = useRouter();

  useEffect(() => {
    const storedPrincipal = localStorage.getItem("principal");
    if (storedPrincipal) {
      setPrincipal(storedPrincipal);
      fetchContracts();
      fetchHistory();
    } else {
      router.push("/");
    }
  }, [router]);

  const fetchContracts = () => {
    setContracts([
      { id: 1, name: "Contract 1", status: "Pending" },
      { id: 2, name: "Contract 2", status: "Signed" },
    ]);
  };

  const fetchHistory = () => {
    setHistory([
      { id: 2, name: "Contract 2", status: "Signed", signedDate: "2025-05-01" },
    ]);
  };

  const handleCreateContract = () => {
    router.push("/contract"); // Arahkan ke /contract
  };

  const handleSignContract = async (contractId: number) => {
    const signedContract = contracts.find((c) => c.id === contractId);
    if (!signedContract) return;

    setContracts(
      contracts.map((c) =>
        c.id === contractId ? { ...c, status: "Signed" } : c
      )
    );
    setHistory([
      ...history,
      {
        ...signedContract,
        status: "Signed",
        signedDate: new Date().toISOString().split("T")[0],
      },
    ]);
  };

  const handleLogout = async () => {
    const client = await AuthClient.create();
    await client.logout();
    localStorage.removeItem("principal");
    setPrincipal(null);
    router.push("/");
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
        <button
          onClick={handleLogout}
          className="rounded-md bg-transparent text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600 font-semibold transition hover:opacity-80 border border-transparent"
        >
          Logout
        </button>
      </header>

      {/* Content */}
      <div className="relative z-10 flex-1 px-6 py-12 flex flex-col lg:flex-row gap-12 lg:gap-x-24 max-w-6xl mx-auto">
        {/* Kiri: Hello */}
        <div className="space-y-6 flex-1">
          <h1 className="text-5xl font-bold leading-tight">
            Hello, <span className="text-cyan-400">{principal}</span>
          </h1>
          <p className="text-gray-300">
            Upload and manage your digital contracts securely on the blockchain.
          </p>
          {/* Upload Contract Section */}
          <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg flex flex-col items-center">
            <FaFileSignature className="text-4xl text-cyan-600 mb-4" />{" "}
            <h2 className="text-2xl font-semibold text-white mb-4">
              Create Contract
            </h2>
            <button
              onClick={handleCreateContract}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-full transition"
            >
              Create Contract
            </button>
          </div>
        </div>

        {/* Kanan: Tabs + Contract Content */}
        <div className="flex-1 space-y-6">
          {/* Tab Header */}
          <div className="flex justify-start space-x-10 border-b border-gray-700 pb-4">
            <button
              onClick={() => setActiveTab("sign")}
              className={`text-xl font-semibold transition pb-2 ${
                activeTab === "sign"
                  ? "border-b-2 border-cyan-400 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Contracts to Sign
            </button>
            <button
              onClick={() => setActiveTab("signed")}
              className={`text-xl font-semibold transition pb-2 ${
                activeTab === "signed"
                  ? "border-b-2 border-cyan-400 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Signed Contracts
            </button>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "sign" ? (
              <div className="space-y-6">
                {contracts.filter((c) => c.status === "Pending").length ===
                0 ? (
                  <p className="text-gray-400 text-center">
                    No pending contracts.
                  </p>
                ) : (
                  contracts
                    .filter((c) => c.status === "Pending")
                    .map((contract) => (
                      <ContractCard
                        key={contract.id}
                        contract={contract}
                        onSign={handleSignContract}
                      />
                    ))
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {history.length === 0 ? (
                  <p className="text-gray-400 text-center">
                    No signed contracts yet.
                  </p>
                ) : (
                  history.map((contract) => (
                    <HistoryCard key={contract.id} contract={contract} />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

    </main>
  );
}

function ContractCard({
  contract,
  onSign,
}: {
  contract: any;
  onSign: (contractId: number) => void;
}) {
  return (
    <div className="bg-[#1e293b] px-6 py-4 rounded-lg shadow hover:shadow-lg transition flex justify-between items-center">
      <div>
        <h3 className="text-white text-base font-medium">{contract.name}</h3>
        <p className="text-gray-400 text-sm">Status: {contract.status}</p>
      </div>
      <button
        onClick={() => onSign(contract.id)}
        className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-1.5 text-sm rounded-full transition"
      >
        Read
      </button>
    </div>
  );
}

function HistoryCard({ contract }: { contract: any }) {
  return (
    <div className="bg-[#1e293b] px-6 py-4 rounded-lg shadow flex justify-between items-center">
      <div>
        <h3 className="text-white text-base font-medium">{contract.name}</h3>
        <p className="text-gray-400 text-sm">Status: {contract.status}</p>
      </div>
      <p className="text-gray-500 text-sm text-right">
        Signed on:
        <br />
        {contract.signedDate}
      </p>
    </div>
  );
}
