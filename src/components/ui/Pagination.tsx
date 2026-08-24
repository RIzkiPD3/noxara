export interface PaginationProps {
  currentPage: number
  onPageChange: (page: number) => void
  hasNextPage?: boolean
  isLoading?: boolean
}

export default function Pagination({
  currentPage,
  onPageChange,
  hasNextPage = true,
  isLoading = false,
}: PaginationProps) {
  const isFirstPage = currentPage <= 1
  const isNextDisabled = !hasNextPage || isLoading

  const handlePrev = () => {
    if (!isFirstPage && !isLoading) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (!isNextDisabled) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <nav
      aria-label="Navigasi Halaman"
      className="flex items-center justify-center gap-2 sm:gap-3 pt-6 pb-2"
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={isFirstPage || isLoading}
        aria-label="Halaman Sebelumnya"
        className="min-h-[44px] flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 border border-slate-800 bg-slate-900/80 text-slate-200 hover:bg-slate-800 hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-900/80 disabled:hover:border-slate-800 cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Sebelumnya</span>
      </button>

      {/* Current Page Badge */}
      <div className="min-h-[44px] px-3 sm:px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs sm:text-sm font-semibold flex items-center gap-1.5">
        <span className="text-slate-400 text-xs uppercase tracking-wider">Hal</span>
        <span className="text-emerald-400 font-bold">{currentPage}</span>
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={isNextDisabled}
        aria-label="Halaman Selanjutnya"
        className="min-h-[44px] flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 border border-slate-800 bg-slate-900/80 text-slate-200 hover:bg-slate-800 hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-900/80 disabled:hover:border-slate-800 cursor-pointer"
      >
        <span>Selanjutnya</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  )
}
