"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthClient } from "@dfinity/auth-client";

export default function Dashboard() {
  const [principal, setPrincipal] = useState<string | null>(null);
  const [contracts, setContracts] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPdfFile(file);
  };

  const handleUploadContract = async () => {
    if (!pdfFile) return;
    setIsUploading(true);
    try {
      const contractHash = await generateHashFromFile(pdfFile);
      console.log("Uploaded contract hash:", contractHash);
      setContracts([
        ...contracts,
        { id: contracts.length + 1, name: `Contract ${contracts.length + 1}`, status: "Pending" },
      ]);
      alert("Contract uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const generateHashFromFile = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
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
      { ...signedContract, status: "Signed", signedDate: new Date().toISOString().split("T")[0] },
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
          className="rounded-md bg-transparent text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600 font-semibold transition hover:opacity-80 border-4 border-transparent border-[1px] border-t-transparent border-b-transparent border-l-transparent border-r-transparent">
          Logout
        </button>
      </header>



      {/* Content */}
      <div className="relative z-10 flex-1 px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Hello, <span className="text-cyan-400">{principal}</span>
          </h1>
          <p className="text-gray-300">
            Upload and manage your digital contracts securely on the blockchain.
          </p>

          {/* Upload Contract */}
          <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Upload Contract</h2>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="bg-[#0f172a] p-2 rounded w-full mb-4"
            />
            <button
              onClick={handleUploadContract}
              disabled={isUploading || !pdfFile}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-full transition"
            >
              {isUploading ? "Uploading..." : "Upload Contract"}
            </button>
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Contracts to Sign</h2>
          {contracts.filter(c => c.status === "Pending").length === 0 ? (
            <p className="text-gray-400">No pending contracts.</p>
          ) : (
            contracts
              .filter((c) => c.status === "Pending")
              .map((contract) => (
                <ContractCard key={contract.id} contract={contract} onSign={handleSignContract} />
              ))
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Signed Contracts</h2>
          {history.length === 0 ? (
            <p className="text-gray-400">No signed contracts yet.</p>
          ) : (
            history.map((contract) => (
              <HistoryCard key={contract.id} contract={contract} />
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center text-gray-500 text-sm py-6 border-t border-gray-800">
        © {new Date().getFullYear()} ACTA. All rights reserved.
      </footer>
    </main>
  );
}

// Card Components
function ContractCard({
  contract,
  onSign,
}: {
  contract: any;
  onSign: (contractId: number) => void;
}) {
  return (
    <div className="bg-[#1e293b] p-5 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-white">{contract.name}</h3>
      <p className="text-gray-400">Status: {contract.status}</p>
      <button
        onClick={() => onSign(contract.id)}
        className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-full transition"
      >
        Sign Contract
      </button>
    </div>
  );
}

function HistoryCard({ contract }: { contract: any }) {
  return (
    <div className="bg-[#1e293b] p-5 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-white">{contract.name}</h3>
      <p className="text-gray-400">Status: {contract.status}</p>
      <p className="text-gray-500 text-sm">Signed on: {contract.signedDate}</p>
    </div>
  );
}
