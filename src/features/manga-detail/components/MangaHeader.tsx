import { useState, useEffect } from 'react'
import type { MangaDetail } from '@/types/komiku'
import { getImageProxyUrl } from '@/services/komikuService'

export interface MangaHeaderProps {
  detail: MangaDetail
  fallbackThumbnail?: string
  onSelectGenre?: (genreSlug: string) => void
  onSelectChapter?: (chapterSlug: string) => void
}

export default function MangaHeader({
  detail,
  fallbackThumbnail,
  onSelectGenre,
  onSelectChapter,
}: MangaHeaderProps) {
  const rawThumbnail = detail.thumbnail || fallbackThumbnail || ''

  const [imgSrc, setImgSrc] = useState<string>(() =>
    rawThumbnail ? getImageProxyUrl(rawThumbnail) : ''
  )
  const [hasError, setHasError] = useState<boolean>(false)

  // Synchronize image src when detail or fallbackThumbnail updates
  useEffect(() => {
    const targetUrl = detail.thumbnail || fallbackThumbnail || ''
    setImgSrc(targetUrl ? getImageProxyUrl(targetUrl) : '')
    setHasError(false)
  }, [detail.thumbnail, fallbackThumbnail])

  const handleImageError = () => {
    const targetUrl = detail.thumbnail || fallbackThumbnail || ''
    if (!hasError && targetUrl && imgSrc !== targetUrl) {
      setImgSrc(targetUrl)
      setHasError(true)
    }
  }

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

  const getStatusBadgeStyle = (status: string) => {
    const lowerStatus = status?.toLowerCase() || ''
    if (lowerStatus.includes('ongoing') || lowerStatus.includes('berjalan')) {
      return 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
    }
    if (lowerStatus.includes('tamat') || lowerStatus.includes('completed')) {
      return 'bg-blue-950/60 text-blue-400 border-blue-800/60'
    }
    return 'bg-slate-800 text-slate-300 border-slate-700'
  }

  const firstChapterSlug = detail.chapters && detail.chapters.length > 0
    ? detail.chapters[0].slug
    : null

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg">
      <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
        
        {/* Cover Image Container */}
        <div className="w-full md:w-56 lg:w-64 shrink-0 mx-auto md:mx-0 max-w-[260px] md:max-w-none">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={detail.title}
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-900 text-slate-600">
                <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-slate-500">No Cover</span>
              </div>
            )}

            {/* Type Badge on Cover */}
            {detail.type && (
              <div className="absolute top-3 left-3">
                <span className={`px-2.5 py-1 text-xs font-bold rounded-lg backdrop-blur-md border shadow-md ${getTypeBadgeStyle(detail.type)}`}>
                  {detail.type}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Info Column */}
        <div className="flex-1 space-y-4 w-full">
          {/* Badges & Rating */}
          <div className="flex flex-wrap items-center gap-2">
            {detail.status && (
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${getStatusBadgeStyle(detail.status)}`}>
                {detail.status}
              </span>
            )}
            {detail.rating && (
              <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Rating: {detail.rating}
              </span>
            )}
          </div>

          {/* Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
              {detail.title}
            </h1>
            {detail.alternative_title && (
              <p className="text-sm text-slate-400 mt-1 italic font-normal">
                {detail.alternative_title}
              </p>
            )}
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm">
            {detail.author && (
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-slate-500 font-medium">Pengarang:</span>
                <span className="font-semibold text-slate-200">{detail.author}</span>
              </div>
            )}
            {detail.theme && (
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-slate-500 font-medium">Tema:</span>
                <span className="font-semibold text-slate-200">{detail.theme}</span>
              </div>
            )}
            {detail.views && (
              <div className="flex items-center gap-2 text-slate-300 sm:col-span-2">
                <span className="text-slate-500 font-medium">Dilihat:</span>
                <span className="text-slate-300 text-xs sm:text-sm">{detail.views}</span>
              </div>
            )}
          </div>

          {/* Genres Badges */}
          {detail.genres && detail.genres.length > 0 && (
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Genre
              </span>
              <div className="flex flex-wrap gap-2">
                {detail.genres.map((g) => (
                  <button
                    key={g.slug || g.name}
                    type="button"
                    onClick={() => onSelectGenre?.(g.slug)}
                    className="px-3 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-emerald-400 text-xs font-medium border border-slate-700/60 transition-colors cursor-pointer"
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Primary Action CTA: Mulai Membaca */}
          {firstChapterSlug && onSelectChapter && (
            <div className="pt-4 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => onSelectChapter(firstChapterSlug)}
                className="min-h-[44px] w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Mulai Membaca Komik</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}
