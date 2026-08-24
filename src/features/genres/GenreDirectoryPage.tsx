import { useState } from 'react'
import { useGenres } from './hooks/useGenres'

export interface GenreDirectoryPageProps {
  onSelectGenre: (genreSlug: string) => void
}

export default function GenreDirectoryPage({ onSelectGenre }: GenreDirectoryPageProps) {
  const { genres, isLoading, error, refetch } = useGenres()
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredGenres = genres.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  )

  return (
    <section className="space-y-6">
      {/* Header & Genre Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
            <span className="w-2 h-7 bg-emerald-500 rounded-full inline-block" />
            Katalog Genre Komik
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60 ml-2">
              {genres.length} Genre
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Pilih genre favorit Anda untuk mengeksplorasi komik berkualitas di Noxara
          </p>
        </div>

        {/* Filter Input */}
        {genres.length > 0 && (
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari genre..."
              className="w-full min-h-[40px] pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 focus:border-emerald-500/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {Array.from({ length: 18 }).map((_, index) => (
            <div
              key={index}
              className="h-16 bg-slate-900 border border-slate-800 rounded-xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="border border-red-900/40 bg-red-950/20 rounded-2xl p-8 text-center max-w-lg mx-auto space-y-4 my-8">
          <div className="w-12 h-12 bg-red-900/30 text-red-400 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-200">Gagal Memuat Katalog Genre</h3>
            <p className="text-sm text-slate-400 mt-1">{error}</p>
          </div>
          <button
            type="button"
            onClick={refetch}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm rounded-lg transition-colors shadow-md cursor-pointer"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Success Genre Directory Grid */}
      {!isLoading && !error && filteredGenres.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredGenres.map((genre) => (
            <button
              key={genre.slug}
              type="button"
              onClick={() => onSelectGenre(genre.slug)}
              className="group p-4 bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/40 rounded-xl transition-all duration-200 text-left flex flex-col justify-between space-y-2 cursor-pointer shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors capitalize truncate">
                  {genre.name}
                </span>
                <svg className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <span className="text-[11px] text-slate-500 font-medium group-hover:text-slate-400">
                Jelajahi Komik &rarr;
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Empty Search Result */}
      {!isLoading && !error && filteredGenres.length === 0 && (
        <div className="border border-slate-800 bg-slate-900/40 rounded-2xl p-10 text-center max-w-md mx-auto my-8 space-y-3">
          <h3 className="text-base font-semibold text-slate-200">Genre Tidak Ditemukan</h3>
          <p className="text-sm text-slate-400">
            Tidak ada genre yang cocok dengan pencarian &quot;{searchQuery}&quot;.
          </p>
        </div>
      )}
    </section>
  )
}
