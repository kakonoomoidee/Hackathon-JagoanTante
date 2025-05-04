const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 text-center text-gray-500 text-sm py-6 border-t border-gray-800">
      © {new Date().getFullYear()} ACTA. All rights reserved.
    </footer>
  );
};

export default Footer;
