import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export interface AppLayoutProps {
  children?: React.ReactNode
  searchQuery?: string
  activeView?: 'home' | 'library' | 'genres' | 'bookmarks' | 'detail' | 'reader'
  onSearch?: (query: string) => void
  onNavigateHome?: () => void
  onNavigateLibrary?: () => void
  onNavigateGenres?: () => void
  onNavigateBookmarks?: () => void
}

export default function AppLayout({
  children,
  searchQuery,
  activeView,
  onSearch,
  onNavigateHome,
  onNavigateLibrary,
  onNavigateGenres,
  onNavigateBookmarks,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden">
      <Navbar
        searchQuery={searchQuery}
        activeView={activeView}
        onSearch={onSearch}
        onNavigateHome={onNavigateHome}
        onNavigateLibrary={onNavigateLibrary}
        onNavigateGenres={onNavigateGenres}
        onNavigateBookmarks={onNavigateBookmarks}
      />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
