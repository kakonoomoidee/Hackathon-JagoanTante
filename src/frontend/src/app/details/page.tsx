"use client";
import { useState } from "react";
import Footer from "@/components/footer";
import Header from '@/components/header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

export default function SignPage() {
  const [contractName] = useState("Example NDA Agreement");
  const [contractDescription] = useState(
    "This contract outlines the terms of the non-disclosure agreement between participants."
  );
  const [participants] = useState<string[]>([
    "0x123abc...def",
    "0x456def...abc",
  ]);
  const [isSigned, setIsSigned] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSign = () => {
    console.log("Contract signed!");
    setIsSigned(true);
  };

  const handleConfirmSign = () => {
    setIsSigned(true);
    setShowConfirm(false);
    handleSign();
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#00ffe055_1px,transparent_1px)] [background-size:24px_24px] z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#020409] to-[#0f172a] opacity-80 z-0" />

      {/* Header */}
      <Header />

      {/* Contract Section */}
      <section className="relative z-10 px-6 py-10 flex justify-center items-center grow">
        <div className="bg-[#1e293b] backdrop-blur-[10px] bg-opacity-20 rounded-2xl p-6 max-w-3xl w-full shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-white">Sign Contract</h2>

          {/* Detail */}
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-400">Contract Name:</p>
              <p className="text-base font-semibold">{contractName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Description:</p>
              <p className="text-base">{contractDescription}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Participants:</p>
              <ul className="list-disc pl-5 text-base">
                {participants.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Download Button with Icon */}
          <div className="flex items-center gap-3 mt-6">
            <FontAwesomeIcon
              icon={faFilePdf}
              className="text-red-500 w-6 h-6"
            />
            <a
              href="/test.pdf"
              download
              className="text-cyan-400 underline hover:text-cyan-300 transition"
            >
              Download Contract PDF
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
