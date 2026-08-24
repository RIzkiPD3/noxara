export interface FilterBarProps {
  selectedType?: string
  selectedSort?: string
  onSelectType: (type: string) => void
  onSelectSort: (sort: string) => void
  onResetFilters?: () => void
  hasActiveFilters?: boolean
}

const TYPE_OPTIONS = [
  { label: 'Semua Tipe', value: '' },
  { label: 'Manga (Jepang)', value: 'manga' },
  { label: 'Manhwa (Korea)', value: 'manhwa' },
  { label: 'Manhua (China)', value: 'manhua' },
]

const SORT_OPTIONS = [
  { label: 'Default', value: '' },
  { label: 'Terbaru', value: 'latest' },
  { label: 'Update', value: 'update' },
]

export default function FilterBar({
  selectedType = '',
  selectedSort = '',
  onSelectType,
  onSelectSort,
  onResetFilters,
  hasActiveFilters = false,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl">
      {/* Controls Container */}
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        {/* Type Filter Select */}
        <div className="flex items-center gap-2">
          <label htmlFor="filter-type" className="text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
            Tipe:
          </label>
          <select
            id="filter-type"
            value={selectedType}
            onChange={(e) => onSelectType(e.target.value)}
            className="bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-200">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <label htmlFor="filter-sort" className="text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
            Urutkan:
          </label>
          <select
            id="filter-sort"
            value={selectedSort}
            onChange={(e) => onSelectSort(e.target.value)}
            className="bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-200">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reset Button if any filter active */}
      {hasActiveFilters && onResetFilters && (
        <button
          type="button"
          onClick={onResetFilters}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer ml-auto"
        >
          <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Reset Filter</span>
        </button>
      )}
    </div>
  )
}
