import type { MangaListItem } from '@/types/komiku'
import ComicCard from './ComicCard'

export interface ComicGridProps {
  items: MangaListItem[]
  onSelectManga?: (slug: string, thumbnail?: string) => void
}

export default function ComicGrid({ items = [], onSelectManga }: ComicGridProps) {
  if (items.length === 0) {
    return (
      <div className="border border-slate-800 bg-slate-900/30 rounded-2xl p-10 text-center max-w-md mx-auto my-8 space-y-3">
        <div className="w-12 h-12 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-slate-200">Belum Ada Komik</h3>
        <p className="text-sm text-slate-400">Tidak ada data komik yang dapat ditampilkan saat ini.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
      {items.map((manga, index) => (
        <ComicCard
          key={manga.slug || `${manga.title}-${index}`}
          manga={manga}
          onSelectManga={onSelectManga}
        />
      ))}
    </div>
  )
}
