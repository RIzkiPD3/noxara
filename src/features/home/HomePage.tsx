import type { UseHomeMangaReturn } from './hooks/useHomeManga'
import ComicGrid from './components/ComicGrid'
import Pagination from '@/components/ui/Pagination'
import GenreBar from '@/features/genres/components/GenreBar'

export interface HomePageProps {
  mangaState: UseHomeMangaReturn
}

export default function HomePage({ mangaState }: HomePageProps) {
  const {
    mangaList,
    isLoading,
    error,
    currentPage,
    searchQuery,
    selectedGenre,
    hasNextPage,
    setCurrentPage,
    clearSearch,
    handleSelectGenre,
    refetch,
  } = mangaState

  // Helper for heading title
  const getHeadingTitle = () => {
    if (searchQuery) return `Hasil Pencarian: "${searchQuery}"`
    if (selectedGenre) {
      const formattedGenre = selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)
      return `Komik Genre: ${formattedGenre}`
    }
    return 'Komik Terbaru'
  }

  // Helper for subtitle
  const getHeadingSubtitle = () => {
    if (searchQuery) return `Menampilkan hasil pencarian komik untuk kata kunci "${searchQuery}"`
    if (selectedGenre) return `Menampilkan daftar komik dengan genre ${selectedGenre}`
    return 'Jelajahi komik terbaru yang diperbarui di Noxara'
  }

  return (
    <section className="space-y-6">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2 capitalize">
            <span className="w-2 h-7 bg-emerald-500 rounded-full inline-block" />
            {getHeadingTitle()}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {getHeadingSubtitle()}
          </p>
        </div>

        {/* Clear Search Action Button if active */}
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Reset Pencarian</span>
          </button>
        )}
      </div>

      {/* Genre Filter Bar */}
      <GenreBar selectedGenre={selectedGenre} onSelectGenre={handleSelectGenre} />

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 pt-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="bg-slate-900/60 border border-slate-800/60 rounded-xl overflow-hidden animate-pulse flex flex-col h-full"
            >
              <div className="aspect-[3/4] bg-slate-800/80 w-full" />
              <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                <div className="h-4 bg-slate-800 rounded w-3/4" />
                <div className="h-3 bg-slate-800/60 rounded w-1/2" />
              </div>
            </div>
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
            <h3 className="text-lg font-semibold text-slate-200">Gagal Memuat Komik</h3>
            <p className="text-sm text-slate-400 mt-1">{error}</p>
          </div>
          <button
            type="button"
            onClick={refetch}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm rounded-lg transition-colors shadow-md shadow-emerald-500/10 cursor-pointer"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Genre Empty State */}
      {!isLoading && !error && selectedGenre && mangaList.length === 0 && (
        <div className="border border-slate-800 bg-slate-900/30 rounded-2xl p-10 text-center max-w-md mx-auto my-8 space-y-4">
          <div className="w-12 h-12 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h10M7 12h10m-8 5h8" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-200">Belum Ada Komik Untuk Genre Ini</h3>
            <p className="text-sm text-slate-400 mt-1">
              Tidak ada komik yang tersedia pada genre &quot;<span className="text-slate-200 font-medium capitalize">{selectedGenre}</span>&quot;.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleSelectGenre('')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold text-sm rounded-lg transition-colors cursor-pointer"
          >
            Lihat Semua Genre
          </button>
        </div>
      )}

      {/* Search Empty State */}
      {!isLoading && !error && searchQuery && !selectedGenre && mangaList.length === 0 && (
        <div className="border border-slate-800 bg-slate-900/30 rounded-2xl p-10 text-center max-w-md mx-auto my-8 space-y-4">
          <div className="w-12 h-12 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-200">Komik Tidak Ditemukan</h3>
            <p className="text-sm text-slate-400 mt-1">
              Tidak ada komik yang cocok dengan kata kunci &quot;<span className="text-slate-200 font-medium">{searchQuery}</span>&quot;.
            </p>
          </div>
          <button
            type="button"
            onClick={clearSearch}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold text-sm rounded-lg transition-colors cursor-pointer"
          >
            Lihat Semua Komik
          </button>
        </div>
      )}

      {/* Default Empty State */}
      {!isLoading && !error && !searchQuery && !selectedGenre && mangaList.length === 0 && (
        <div className="border border-slate-800 bg-slate-900/30 rounded-2xl p-10 text-center max-w-md mx-auto my-8 space-y-3">
          <div className="w-12 h-12 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-slate-200">Belum Ada Komik</h3>
          <p className="text-sm text-slate-400">Tidak ada data komik yang dapat ditampilkan saat ini.</p>
        </div>
      )}

      {/* Success State: Comic Grid & Pagination */}
      {!isLoading && !error && mangaList.length > 0 && (
        <>
          <ComicGrid items={mangaList} />
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            hasNextPage={hasNextPage}
            isLoading={isLoading}
          />
        </>
      )}
    </section>
  )
}
