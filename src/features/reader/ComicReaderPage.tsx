import { useComicReader } from './hooks/useComicReader'
import ReaderHeader from './components/ReaderHeader'
import ReaderImage from './components/ReaderImage'

export interface ComicReaderPageProps {
  chapterSlug: string
  onBack: () => void
}

export default function ComicReaderPage({ chapterSlug, onBack }: ComicReaderPageProps) {
  const { chapterData, isLoading, error, refetch } = useComicReader(chapterSlug)

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const images = chapterData?.images || []
  const totalCount = chapterData?.images_count || images.length

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Sticky Reader Header */}
      <ReaderHeader
        title={chapterData?.title}
        totalImages={totalCount}
        onBack={onBack}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-2 sm:px-4 py-4 space-y-3">
        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4 max-w-3xl mx-auto py-8">
            <div className="text-center space-y-2 mb-6">
              <div className="h-6 bg-slate-900 rounded w-1/2 mx-auto animate-pulse" />
              <div className="h-4 bg-slate-900/60 rounded w-1/4 mx-auto animate-pulse" />
            </div>
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="w-full aspect-[3/4] max-h-[700px] bg-slate-900/80 rounded-lg animate-pulse border border-slate-800/60 flex items-center justify-center text-slate-700"
              >
                <span className="text-xs font-mono text-slate-600">Memuat Halaman...</span>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="border border-red-900/40 bg-red-950/20 rounded-2xl p-8 text-center max-w-lg mx-auto space-y-4 my-12">
            <div className="w-12 h-12 bg-red-900/30 text-red-400 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-200">Gagal Memuat Chapter</h3>
              <p className="text-sm text-slate-400 mt-1">{error}</p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={refetch}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm rounded-lg transition-colors shadow-md cursor-pointer"
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

        {/* Empty State */}
        {!isLoading && !error && images.length === 0 && (
          <div className="border border-slate-800 bg-slate-900/30 rounded-2xl p-10 text-center max-w-md mx-auto my-12 space-y-4">
            <div className="w-12 h-12 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-200">Halaman Komik Tidak Tersedia</h3>
              <p className="text-sm text-slate-400 mt-1">
                Chapter ini tidak memiliki gambar halaman yang dapat ditampilkan saat ini.
              </p>
            </div>
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold text-sm rounded-lg transition-colors cursor-pointer"
            >
              Kembali ke Detail Komik
            </button>
          </div>
        )}

        {/* Success Vertical Image List */}
        {!isLoading && !error && images.length > 0 && (
          <div className="flex flex-col items-center">
            {images.map((imgUrl, index) => (
              <ReaderImage
                key={`${imgUrl}-${index}`}
                src={imgUrl}
                pageNumber={index + 1}
                chapterTitle={chapterData?.title}
              />
            ))}

            {/* Bottom Footer Actions */}
            <div className="mt-8 mb-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-6 border-t border-slate-900">
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                ← Kembali ke Detail Komik
              </button>
              <button
                type="button"
                onClick={scrollToTop}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                ↑ Ke Atas Halaman
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
