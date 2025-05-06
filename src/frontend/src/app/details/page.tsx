"use client";
import { useState } from "react";
import Footer from "@/components/footer";
import Header from '@/components/header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

export default function DetailsPage() {
  const [contractName] = useState("NDA with Alpha Inc.");
  const [contractDescription] = useState(
    "Non-disclosure agreement for partnership discussions."
  );
  const [participants] = useState<string[]>([
    "dfkou-vvi7x-ay4sk-7zcim-hfpll-3iffd-jdaw6-luz6b-j435p-o2uuu-rae",
    "gcdsh-gerfu-7spzv-stj6v-677xr-gkev6-6cahf-a5opz-khg76-mrpz5-3ae",
  ]);
  const [signedDate] = useState("2025-05-01"); // Tambahkan tanggal signed di sini

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
          <h2 className="text-2xl font-bold text-white">Contract Details</h2>

          {/* Detail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-300">

            <div className="bg-[#0f172a] p-4 rounded-lg border border-gray-700 shadow-sm">
              <p className="text-gray-400 mb-1">Contract Name</p>
              <p className="text-white font-medium">{contractName}</p>
            </div>


            <div className="bg-[#0f172a] p-4 rounded-lg border border-gray-700 shadow-sm">
              <p className="text-gray-400 mb-1">Signed Date</p>
              <p className="text-white font-medium">{signedDate}</p>
            </div>


            <div className="bg-[#0f172a] p-4 rounded-lg border border-gray-700 shadow-sm col-span-full">
              <p className="text-gray-400 mb-1">Description</p>
              <p className="text-white font-medium">{contractDescription}</p>
            </div>

            <div className="bg-[#0f172a] p-4 rounded-lg border border-gray-700 shadow-sm col-span-full">
              <p className="text-gray-400 mb-1">Participants</p>
              <ul className="list-disc pl-5 text-white space-y-1">
                {participants.map((p, i) => (
                  <li key={i} className="break-words">{p}</li>
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
