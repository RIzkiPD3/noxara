import { useState, useEffect, type FormEvent, type MouseEvent } from 'react'
import { useBookmarks } from '@/features/bookmarks/hooks/useBookmarks'

export interface NavbarProps {
  searchQuery?: string
  activeView?: 'home' | 'library' | 'genres' | 'bookmarks' | 'detail' | 'reader'
  onSearch?: (query: string) => void
  onNavigateHome?: () => void
  onNavigateLibrary?: () => void
  onNavigateGenres?: () => void
  onNavigateBookmarks?: () => void
}

export default function Navbar({
  searchQuery = '',
  activeView = 'home',
  onSearch,
  onNavigateHome,
  onNavigateLibrary,
  onNavigateGenres,
  onNavigateBookmarks,
}: NavbarProps) {
  const { totalBookmarks } = useBookmarks()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [inputValue, setInputValue] = useState(searchQuery)

  // Synchronize internal input state if searchQuery prop changes externally
  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(inputValue.trim())
    }
    setIsMobileMenuOpen(false)
  }

  const handleClear = () => {
    setInputValue('')
    if (onSearch) {
      onSearch('')
    }
  }

  const handleHomeClick = (e: MouseEvent) => {
    e.preventDefault()
    handleClear()
    if (onNavigateHome) onNavigateHome()
    else if (typeof window !== 'undefined') window.location.hash = ''
    setIsMobileMenuOpen(false)
  }

  const handleLibraryClick = (e: MouseEvent) => {
    e.preventDefault()
    if (onNavigateLibrary) onNavigateLibrary()
    else if (typeof window !== 'undefined') window.location.hash = '#/comics'
    setIsMobileMenuOpen(false)
  }

  const handleGenresClick = (e: MouseEvent) => {
    e.preventDefault()
    if (onNavigateGenres) onNavigateGenres()
    else if (typeof window !== 'undefined') window.location.hash = '#/genres'
    setIsMobileMenuOpen(false)
  }

  const handleBookmarksClick = (e: MouseEvent) => {
    e.preventDefault()
    if (onNavigateBookmarks) onNavigateBookmarks()
    else if (typeof window !== 'undefined') window.location.hash = '#/bookmarks'
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={handleHomeClick}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                N
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Noxara
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {/* Home */}
            <a
              href="#"
              onClick={handleHomeClick}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                activeView === 'home'
                  ? 'bg-slate-800 text-emerald-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Home
            </a>

            {/* Daftar Komik */}
            <a
              href="#/comics"
              onClick={handleLibraryClick}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                activeView === 'library'
                  ? 'bg-slate-800 text-emerald-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Daftar Komik
            </a>

            {/* Genre */}
            <a
              href="#/genres"
              onClick={handleGenresClick}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                activeView === 'genres'
                  ? 'bg-slate-800 text-emerald-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Genre
            </a>

            {/* Bookmark */}
            <a
              href="#/bookmarks"
              onClick={handleBookmarksClick}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeView === 'bookmarks'
                  ? 'bg-slate-800 text-emerald-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span>Bookmark</span>
              {totalBookmarks > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                  {totalBookmarks}
                </span>
              )}
            </a>
          </nav>

          {/* Search Bar Form (Desktop) */}
          <form onSubmit={handleSubmit} className="hidden sm:flex items-center flex-1 max-w-xs ml-auto md:ml-0">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Cari komik..."
                className="w-full pl-9 pr-8 py-1.5 bg-slate-800/60 border border-slate-700/60 focus:border-emerald-500/80 rounded-lg text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-colors"
                aria-label="Cari komik"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Hapus kata kunci pencarian"
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </form>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none cursor-pointer"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation & Search Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-900 px-4 pt-2 pb-4 space-y-2" id="mobile-menu">
          {/* Mobile Search Form */}
          <form onSubmit={handleSubmit} className="mb-3">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Cari komik..."
                className="w-full pl-9 pr-8 py-2 bg-slate-800/60 border border-slate-700/60 focus:border-emerald-500/80 rounded-lg text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-colors"
                aria-label="Cari komik mobile"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Hapus kata kunci pencarian mobile"
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </form>

          {/* Navigation Links */}
          <a
            href="#"
            onClick={handleHomeClick}
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
              activeView === 'home'
                ? 'bg-slate-800 text-emerald-400 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Home
          </a>
          <a
            href="#/comics"
            onClick={handleLibraryClick}
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
              activeView === 'library'
                ? 'bg-slate-800 text-emerald-400 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Daftar Komik
          </a>
          <a
            href="#/genres"
            onClick={handleGenresClick}
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
              activeView === 'genres'
                ? 'bg-slate-800 text-emerald-400 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Genre
          </a>
          <a
            href="#/bookmarks"
            onClick={handleBookmarksClick}
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer flex items-center justify-between ${
              activeView === 'bookmarks'
                ? 'bg-slate-800 text-emerald-400 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span>Bookmark</span>
            {totalBookmarks > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                {totalBookmarks}
              </span>
            )}
          </a>
        </div>
      )}
    </header>
  )
}
