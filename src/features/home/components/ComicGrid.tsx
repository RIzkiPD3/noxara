import type { MangaListItem } from '@/types/komiku'
import ComicCard from './ComicCard'

export interface ComicGridProps {
  items: MangaListItem[]
  onSelectManga?: (slug: string, thumbnail?: string) => void
}

export default function ComicGrid({ items, onSelectManga }: ComicGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
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
