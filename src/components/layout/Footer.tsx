export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800/60">
          
          {/* Column 1: Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-sm">
                N
              </div>
              <span className="text-lg font-bold text-slate-100">
                Noxara
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Platform baca komik digital modern dengan pengalaman membaca yang cepat, responsif, dan nyaman.
            </p>
          </div>

          {/* Column 2: Navigation Links Placeholder */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Navigasi
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Daftar Komik</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Genre</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Bookmark</a></li>
            </ul>
          </div>

          {/* Column 3: Information Placeholder */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Informasi
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </div>

        </div>

        {/* Copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Noxara. All rights reserved.</p>
          <p>Powered by React, TypeScript, Vite & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
