export default function ContractPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#00ffe055_1px,transparent_1px)] [background-size:24px_24px] z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#020409] to-[#0f172a] opacity-80 z-0" />

      

      {/* Footer */}
      <footer className="relative z-10 text-center text-gray-500 text-sm py-6 border-t border-gray-800">
        © {new Date().getFullYear()} ACTA. All rights reserved.
      </footer>
    </main>
  );
}
