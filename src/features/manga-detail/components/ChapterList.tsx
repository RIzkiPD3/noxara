import { useState, type MouseEvent } from 'react'
import type { MangaChapterItem } from '@/types/komiku'

export interface ChapterListProps {
  chapters?: MangaChapterItem[]
  chaptersCount?: number
  onSelectChapter?: (chapterSlug: string) => void
}

export default function ChapterList({
  chapters = [],
  chaptersCount,
  onSelectChapter,
}: ChapterListProps) {
  const [filterQuery, setFilterQuery] = useState<string>('')

  const filteredChapters = chapters.filter((c) =>
    c.title.toLowerCase().includes(filterQuery.toLowerCase().trim())
  )

  const totalCount = chaptersCount ?? chapters.length

  const handleChapterClick = (e: MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (onSelectChapter && slug) {
      e.preventDefault()
      onSelectChapter(slug)
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 space-y-4 shadow-lg">
      {/* Header & Chapter Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-emerald-500 rounded-full inline-block" />
          Daftar Chapter
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
            {totalCount}
          </span>
        </h2>

        {/* Filter Chapter Input */}
        {chapters.length > 5 && (
          <div className="relative w-full sm:w-48">
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Cari chapter..."
              className="w-full min-h-[38px] pl-8 pr-3 py-1.5 bg-slate-950/80 border border-slate-700/60 focus:border-emerald-500/80 rounded-lg text-xs text-slate-100 placeholder-slate-400 focus:outline-none transition-colors"
            />
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Chapter Items List */}
      {filteredChapters.length > 0 ? (
        <div className="max-h-[500px] overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          {filteredChapters.map((chapter) => {
            const href = chapter.slug ? `#/read/${chapter.slug}` : '#'
            return (
              <a
                key={chapter.slug || chapter.title}
                href={href}
                onClick={(e) => handleChapterClick(e, chapter.slug)}
                className="min-h-[44px] flex items-center justify-between p-3 sm:p-3.5 rounded-lg bg-slate-950/80 hover:bg-slate-800/90 border border-slate-800/60 hover:border-emerald-500/40 transition-all group cursor-pointer block"
              >
                <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors pr-2">
                  {chapter.title}
                </span>
                {chapter.release_date && (
                  <span className="text-[11px] sm:text-xs text-slate-500 font-medium whitespace-nowrap">
                    {chapter.release_date}
                  </span>
                )}
              </a>
            )
          })}
        </div>
      ) : (
        <div className="p-6 text-center text-sm text-slate-400 italic">
          {filterQuery ? `Tidak ada chapter yang cocok dengan "${filterQuery}"` : 'Daftar chapter belum tersedia.'}
        </div>
      )}
    </div>
  )
}
