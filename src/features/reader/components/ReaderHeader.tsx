export interface ReaderHeaderProps {
  title?: string
  totalImages?: number
  prevSlug?: string | null
  nextSlug?: string | null
  onBack: () => void
  onSelectChapter?: (slug: string) => void
}

export default function ReaderHeader({
  title,
  totalImages,
  prevSlug,
  nextSlug,
  onBack,
  onSelectChapter,
}: ReaderHeaderProps) {
  const hasPrev = Boolean(prevSlug)
  const hasNext = Boolean(nextSlug)

  return (
    <div className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-4 py-2.5 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="min-h-[40px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-emerald-400 text-xs font-semibold transition-colors cursor-pointer shrink-0"
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden sm:inline">Kembali</span>
        </button>

        {/* Chapter Title & Page Count */}
        <div className="flex-1 text-center min-w-0 px-1">
          <h1 className="text-xs sm:text-sm font-bold text-slate-100 truncate">
            {title || 'Membaca Chapter'}
          </h1>
          {typeof totalImages === 'number' && totalImages > 0 && (
            <span className="text-[11px] text-slate-400 font-medium block sm:inline sm:ml-2">
              ({totalImages} Halaman)
            </span>
          )}
        </div>

        {/* Header Quick Chapter Navigation Buttons */}
        {onSelectChapter && (
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              disabled={!hasPrev}
              onClick={() => prevSlug && onSelectChapter(prevSlug)}
              title="Chapter Sebelumnya"
              className={`min-h-[40px] min-w-[40px] flex items-center justify-center p-2 rounded-lg border text-xs font-medium transition-colors ${
                hasPrev
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200 hover:text-emerald-400 cursor-pointer'
                  : 'bg-slate-950 border-slate-900 text-slate-700 cursor-not-allowed opacity-50'
              }`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              disabled={!hasNext}
              onClick={() => nextSlug && onSelectChapter(nextSlug)}
              title="Chapter Berikutnya"
              className={`min-h-[40px] min-w-[40px] flex items-center justify-center p-2 rounded-lg border text-xs font-medium transition-colors ${
                hasNext
                  ? 'bg-emerald-500 border-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold cursor-pointer'
                  : 'bg-slate-950 border-slate-900 text-slate-700 cursor-not-allowed opacity-50'
              }`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
