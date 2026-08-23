import { useState } from 'react'
import type { MangaListItem } from '@/types/komiku'
import { getImageProxyUrl } from '@/services/komikuService'

export interface ComicCardProps {
  manga: MangaListItem
}

export default function ComicCard({ manga }: ComicCardProps) {
  const [imgSrc, setImgSrc] = useState<string>(() =>
    manga.thumbnail ? getImageProxyUrl(manga.thumbnail) : ''
  )
  const [hasError, setHasError] = useState<boolean>(false)

  // Handle fallback if proxy image fails to load
  const handleImageError = () => {
    if (!hasError && manga.thumbnail && imgSrc !== manga.thumbnail) {
      // Try direct thumbnail URL as fallback
      setImgSrc(manga.thumbnail)
      setHasError(true)
    }
  }

  // Type badge styling helper
  const getTypeBadgeStyle = (type: string) => {
    const lowerType = type?.toLowerCase() || ''
    if (lowerType.includes('manga')) {
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    }
    if (lowerType.includes('manhwa')) {
      return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    }
    if (lowerType.includes('manhua')) {
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    }
    return 'bg-slate-700/50 text-slate-300 border-slate-600/50'
  }

  return (
    <article className="group flex flex-col h-full bg-slate-900/60 border border-slate-800/80 rounded-xl overflow-hidden hover:border-slate-700/80 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-200">
      {/* Thumbnail Container */}
      <div className="relative aspect-[3/4] w-full bg-slate-950 overflow-hidden">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={manga.title}
            onError={handleImageError}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-900 text-slate-600">
            <svg className="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs text-slate-500">No Image</span>
          </div>
        )}

        {/* Type Badge */}
        {manga.type && (
          <div className="absolute top-2.5 left-2.5">
            <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-md backdrop-blur-md border shadow-sm ${getTypeBadgeStyle(manga.type)}`}>
              {manga.type}
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>

      {/* Content Body */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-100 group-hover:text-emerald-400 line-clamp-2 leading-snug transition-colors">
          {manga.title}
        </h3>

        {/* Latest Chapter Footer */}
        {manga.latest_chapter && (
          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
            <span className="truncate text-slate-400 group-hover:text-slate-300">
              {manga.latest_chapter}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}
