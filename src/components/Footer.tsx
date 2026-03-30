export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-white/5 bg-[#0e0e0e] mb-14 md:mb-0">
      <div className="flex flex-col md:flex-row justify-between items-center px-10 gap-6 max-w-7xl mx-auto">
        <div className="font-['Space_Grotesk'] text-[#ff5722] font-bold tracking-widest text-lg uppercase">
          G. MEDENOU
        </div>
        <p className="font-['Inter'] text-xs tracking-widest text-white/40 uppercase">
          © 2025 GILLES MEDENOU. ARCHITECTE BACKEND.
        </p>
        <div className="flex gap-8">
          <a href="www.linkedin.com/in/gilles-medenou-238296222" target="_blank" rel="noopener noreferrer" className="font-['Inter'] text-xs tracking-widest text-white/40 hover:text-white transition-colors">LinkedIn</a>
          <a href="https://github.com/Gillesto66" target="_blank" rel="noopener noreferrer" className="font-['Inter'] text-xs tracking-widest text-white/40 hover:text-white transition-colors">GitHub</a>
          <a href="https://wa.me/95802308" target="_blank" rel="noopener noreferrer" className="font-['Inter'] text-xs tracking-widest text-white/40 hover:text-white transition-colors">Whatsapp</a>
        </div>
      </div>
    </footer>
  );
}
