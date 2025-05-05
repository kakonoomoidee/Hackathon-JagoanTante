'use client';

import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  return (
    <header className="relative z-10 w-full px-8 py-4 flex justify-between items-center border-b border-gray-800">
      <div className="flex items-center gap-2">
        <img
          src="/acta_logo.png"
          alt="ACTA Logo"
          className="h-8 w-auto cursor-pointer"
          onClick={() => router.push('/dashboard')}
        />
      </div>
    </header>
  );
};

export default Header;
