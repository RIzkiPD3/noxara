export interface ReaderHeaderProps {
  title?: string
  totalImages?: number
  onBack: () => void
}

export default function ReaderHeader({ title, totalImages, onBack }: ReaderHeaderProps) {
  return (
    <div className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-emerald-400 text-xs font-semibold transition-colors cursor-pointer shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden sm:inline">Kembali</span>
        </button>

        {/* Chapter Title */}
        <div className="flex-1 text-center min-w-0">
          <h1 className="text-sm sm:text-base font-bold text-slate-100 truncate">
            {title || 'Membaca Chapter'}
          </h1>
        </div>

        {/* Page Count Badge */}
        {typeof totalImages === 'number' && totalImages > 0 && (
          <div className="shrink-0">
            <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 text-xs font-medium whitespace-nowrap">
              {totalImages} Halaman
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
