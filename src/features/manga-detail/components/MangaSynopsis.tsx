import { useState } from 'react'

export interface MangaSynopsisProps {
  synopsis?: string
}

export default function MangaSynopsis({ synopsis }: MangaSynopsisProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const isLongText = Boolean(synopsis && synopsis.length > 240)
  const displayText = isLongText && !isExpanded
    ? `${synopsis?.slice(0, 240).trim()}...`
    : synopsis

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-6 space-y-3">
      <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
        <span className="w-1.5 h-5 bg-emerald-500 rounded-full inline-block" />
        Sinopsis Komik
      </h2>

      {synopsis ? (
        <div className="space-y-3">
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line font-sans">
            {displayText}
          </p>
          {isLongText && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer pt-1"
            >
              <span>{isExpanded ? 'Sembunyikan Sinopsis' : 'Baca Selengkapnya'}</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
      ) : (
        <p className="text-sm text-slate-500 italic">
          Sinopsis belum tersedia untuk komik ini.
        </p>
      )}
    </div>
  )
}
