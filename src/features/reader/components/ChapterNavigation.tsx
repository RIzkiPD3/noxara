export interface ChapterNavigationProps {
  prevSlug?: string | null
  nextSlug?: string | null
  onSelectChapter: (slug: string) => void
}

export default function ChapterNavigation({
  prevSlug,
  nextSlug,
  onSelectChapter,
}: ChapterNavigationProps) {
  const hasPrev = Boolean(prevSlug)
  const hasNext = Boolean(nextSlug)

  return (
    <div className="flex items-center justify-between gap-2.5 sm:gap-3 w-full max-w-xl mx-auto py-2">
      {/* Previous Chapter Button */}
      <button
        type="button"
        disabled={!hasPrev}
        onClick={() => prevSlug && onSelectChapter(prevSlug)}
        className={`min-h-[44px] flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 shadow-sm ${
          hasPrev
            ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-emerald-400 border border-slate-800 hover:border-slate-700 cursor-pointer active:scale-95'
            : 'bg-slate-900/40 text-slate-600 border border-slate-900/60 cursor-not-allowed opacity-50 select-none'
        }`}
      >
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="truncate">Sebelumnya</span>
      </button>

      {/* Next Chapter Button */}
      <button
        type="button"
        disabled={!hasNext}
        onClick={() => nextSlug && onSelectChapter(nextSlug)}
        className={`min-h-[44px] flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 shadow-sm ${
          hasNext
            ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/10 cursor-pointer active:scale-95'
            : 'bg-slate-900/40 text-slate-600 border border-slate-900/60 cursor-not-allowed opacity-50 select-none'
        }`}
      >
        <span className="truncate">Berikutnya</span>
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
