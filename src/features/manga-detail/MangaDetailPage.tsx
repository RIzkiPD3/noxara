import { useMangaDetail } from './hooks/useMangaDetail'
import MangaHeader from './components/MangaHeader'
import MangaSynopsis from './components/MangaSynopsis'
import ChapterList from './components/ChapterList'

export interface MangaDetailPageProps {
  slug: string
  fallbackThumbnail?: string
  onBack: () => void
  onSelectGenre?: (genreSlug: string) => void
  onSelectChapter?: (chapterSlug: string) => void
}

export default function MangaDetailPage({
  slug,
  fallbackThumbnail,
  onBack,
  onSelectGenre,
  onSelectChapter,
}: MangaDetailPageProps) {
  const { mangaDetail, isLoading, error, refetch } = useMangaDetail(slug, fallbackThumbnail)

  return (
    <section className="space-y-6">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-emerald-400 text-xs font-semibold transition-all cursor-pointer shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Kembali ke Daftar Komik</span>
        </button>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-6 animate-pulse">
          {/* Header Skeleton */}
          <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-6 flex flex-col md:flex-row gap-6">
            <div className="w-56 h-72 bg-slate-800/80 rounded-xl shrink-0 mx-auto md:mx-0" />
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-slate-800 rounded w-3/4" />
              <div className="h-4 bg-slate-800/60 rounded w-1/2" />
              <div className="space-y-2 pt-4">
                <div className="h-4 bg-slate-800/60 rounded w-full" />
                <div className="h-4 bg-slate-800/60 rounded w-2/3" />
              </div>
            </div>
          </div>
          {/* Synopsis Skeleton */}
          <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-6 space-y-3">
            <div className="h-6 bg-slate-800 rounded w-1/4" />
            <div className="h-16 bg-slate-800/60 rounded w-full" />
          </div>
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
            <h3 className="text-lg font-semibold text-slate-200">Gagal Memuat Detail Komik</h3>
            <p className="text-sm text-slate-400 mt-1">{error}</p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={refetch}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm rounded-lg transition-colors shadow-md shadow-emerald-500/10 cursor-pointer"
            >
              Coba Lagi
            </button>
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm rounded-lg transition-colors cursor-pointer"
            >
              Kembali
            </button>
          </div>
        </div>
      )}

      {/* Success Detail View */}
      {!isLoading && !error && mangaDetail && (
        <div className="space-y-6">
          <MangaHeader
            detail={mangaDetail}
            fallbackThumbnail={fallbackThumbnail}
            onSelectGenre={onSelectGenre}
          />
          <MangaSynopsis synopsis={mangaDetail.synopsis} />
          <ChapterList
            chapters={mangaDetail.chapters}
            chaptersCount={mangaDetail.chapters_count}
            onSelectChapter={onSelectChapter}
          />
        </div>
      )}
    </section>
  )
}
