"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthClient } from "@dfinity/auth-client";

export default function Dashboard() {
  const [principal, setPrincipal] = useState<string | null>(null);
  const [contracts, setContracts] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]); // Store signed contracts history
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
      router.push("/"); // Redirect to the landing page if not authenticated
    }
  }, [router]);

  const fetchContracts = () => {
    // Simulate fetching contracts from the blockchain or a database
    setContracts([
      { id: 1, name: "Contract 1", status: "Pending" },
      { id: 2, name: "Contract 2", status: "Signed" },
    ]);
  };

  const fetchHistory = () => {
    // Simulate fetching history of signed contracts from the blockchain or a database
    setHistory([
      { id: 1, name: "Contract 2", status: "Signed", signedDate: "2025-05-01" },
    ]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setPdfFile(file);
    }
  };

  const handleUploadContract = async () => {
    if (!pdfFile) return;
    setIsUploading(true);
    try {
      const contractHash = await generateHashFromFile(pdfFile);
      console.log("Contract uploaded with hash:", contractHash);
      setContracts([
        ...contracts,
        { id: contracts.length + 1, name: `Contract ${contracts.length + 1}`, status: "Pending" },
      ]);
      alert("Contract uploaded successfully!");
    } catch (error) {
      console.error("Error uploading contract:", error);
      alert("Failed to upload contract!");
    } finally {
      setIsUploading(false);
    }
  };

  const generateHashFromFile = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
    return hashHex;
  };

  const handleSignContract = async (contractId: number) => {
    setContracts(
      contracts.map((contract) =>
        contract.id === contractId ? { ...contract, status: "Signed" } : contract
      )
    );
    const signedContract = contracts.find((contract) => contract.id === contractId);
    if (signedContract) {
      setHistory([...history, { ...signedContract, signedDate: new Date().toISOString().split("T")[0] }]);
    }
  };

  const handleLogout = async () => {
    const client = await AuthClient.create();
    await client.logout();
    localStorage.removeItem("principal");
    setPrincipal(null);
    router.push("/"); // Redirect to the landing page after logout
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white px-6 py-16 relative">
      {/* Logo and Logout Button */}
      <div className="absolute top-6 left-6">
        <img src="/acta.png" alt="Logo" className="w-20 h-auto" />
      </div>
      <div className="absolute top-6 right-6">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition duration-300"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-12">
        {/* Left Section */}
        <div className="flex-1 space-y-8">
          <h1 className="text-4xl font-bold leading-tight">
            Welcome back, <span className="text-cyan-400">{principal}</span>
          </h1>
          <p className="text-lg text-gray-300">
            Manage your digital contracts, sign them, and ensure secure transactions on the blockchain.
          </p>
          <p className="text-gray-400 text-md">
            Upload contracts for signing and verification with decentralized technology.
          </p>

          {/* Upload Contract Section */}
          <div>
            <h2 className="text-3xl font-medium mb-6 text-white">Upload Contract</h2>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="bg-[#1e293b] p-3 rounded-lg shadow-md text-white"
            />
            <button
              onClick={handleUploadContract}
              disabled={isUploading || !pdfFile}
              className="mt-4 bg-cyan-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-cyan-700 transition"
            >
              {isUploading ? "Uploading..." : "Upload Contract"}
            </button>
          </div>
        </div>

        {/* Right Section - Contracts List */}
        <div className="flex-1">
          <h2 className="text-3xl font-medium mb-6 text-white">Contracts to Sign</h2>
          <div className="space-y-4">
            {contracts
              .filter((contract) => contract.status === "Pending")
              .map((contract) => (
                <ContractCard key={contract.id} contract={contract} onSign={handleSignContract} />
              ))}
          </div>
        </div>

        {/* History Section */}
        <div className="flex-1">
          <h2 className="text-3xl font-medium mb-6 text-white">Contract History</h2>
          <div className="space-y-4">
            {history.length > 0 ? (
              history.map((contract) => (
                <HistoryCard key={contract.id} contract={contract} />
              ))
            ) : (
              <p className="text-gray-400">No contracts signed yet.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function ContractCard({ contract, onSign }: { contract: any; onSign: (contractId: number) => void }) {
  return (
    <div className="bg-[#1e293b] p-6 rounded-lg shadow-md hover:scale-105 transition transform">
      <h3 className="text-xl font-medium text-white">{contract.name}</h3>
      <p className="text-gray-300">Status: {contract.status}</p>
      {contract.status === "Pending" && (
        <button
          onClick={() => onSign(contract.id)}
          className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded-full hover:bg-cyan-700 transition duration-200"
        >
          Sign Contract
        </button>
      )}
    </div>
  );
}

function HistoryCard({ contract }: { contract: any }) {
  return (
    <div className="bg-[#1e293b] p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-medium text-white">{contract.name}</h3>
      <p className="text-gray-300">Status: {contract.status}</p>
      <p className="text-gray-400">Signed on: {contract.signedDate}</p>
    </div>
  );
}
