import type { UseHomeMangaReturn } from '@/features/home/hooks/useHomeManga'
import ComicGrid from '@/features/home/components/ComicGrid'
import Pagination from '@/components/ui/Pagination'
import GenreBar from '@/features/genres/components/GenreBar'
import FilterBar from '@/features/home/components/FilterBar'

export interface ComicLibraryPageProps {
  mangaState: UseHomeMangaReturn
  onSelectManga?: (slug: string, thumbnail?: string) => void
}

export default function ComicLibraryPage({ mangaState, onSelectManga }: ComicLibraryPageProps) {
  const {
    mangaList,
    isLoading,
    error,
    currentPage,
    searchQuery,
    selectedGenre,
    selectedType,
    selectedSort,
    hasNextPage,
    hasActiveFilters,
    setCurrentPage,
    handleSelectGenre,
    handleSelectType,
    handleSelectSort,
    resetAllFilters,
    refetch,
  } = mangaState

  const getTitle = () => {
    if (searchQuery) return `Katalog: "${searchQuery}"`
    if (selectedGenre) {
      const formatted = selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)
      return `Katalog Komik - Genre: ${formatted}`
    }
    if (selectedType) {
      const typeMap: Record<string, string> = {
        manga: 'Manga (Jepang)',
        manhwa: 'Manhwa (Korea)',
        manhua: 'Manhua (China)',
      }
      return `Katalog Komik - Tipe: ${typeMap[selectedType] || selectedType}`
    }
    return 'Daftar Seluruh Komik'
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2 capitalize">
            <span className="w-2 h-7 bg-emerald-500 rounded-full inline-block" />
            {getTitle()}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Jelajahi seluruh koleksi komik digital terlengkap di Noxara
          </p>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetAllFilters}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-emerald-400 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Reset Semua Filter</span>
          </button>
        )}
      </div>

      {/* Genre Filter Bar */}
      <GenreBar selectedGenre={selectedGenre} onSelectGenre={handleSelectGenre} />

      {/* Type & Sort Filter Toolbar */}
      <FilterBar
        selectedType={selectedType}
        selectedSort={selectedSort}
        onSelectType={handleSelectType}
        onSelectSort={handleSelectSort}
        onResetFilters={resetAllFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 pt-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden animate-pulse flex flex-col h-full"
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
            <h3 className="text-lg font-semibold text-slate-200">Gagal Memuat Daftar Komik</h3>
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

      {/* Success View */}
      {!isLoading && !error && (
        <>
          <ComicGrid items={mangaList} onSelectManga={onSelectManga} />
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
