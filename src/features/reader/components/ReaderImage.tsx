import { useState } from 'react'
import { getImageProxyUrl } from '@/services/komikuService'

export interface ReaderImageProps {
  src: string
  pageNumber: number
  chapterTitle?: string
}

export default function ReaderImage({ src, pageNumber, chapterTitle }: ReaderImageProps) {
  const [proxyUrl, setProxyUrl] = useState<string>(() =>
    src ? getImageProxyUrl(src) : ''
  )
  const [hasTriedFallback, setHasTriedFallback] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)

  const handleImageError = () => {
    if (!hasTriedFallback && src && proxyUrl !== src) {
      setProxyUrl(src)
      setHasTriedFallback(true)
    } else {
      setHasError(true)
      setIsLoaded(true)
    }
  }

  const handleRetry = () => {
    setHasError(false)
    setIsLoaded(false)
    setHasTriedFallback(false)
    setProxyUrl(src ? getImageProxyUrl(src) : '')
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center bg-slate-950">
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="w-full aspect-[3/4] max-h-[900px] bg-slate-900/80 animate-pulse flex flex-col items-center justify-center text-slate-700">
          <svg className="w-10 h-10 mb-2 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="text-xs font-mono text-slate-500">Memuat Halaman {pageNumber}...</span>
        </div>
      )}

      {/* Image Element - Seamless display */}
      {!hasError && proxyUrl && (
        <img
          src={proxyUrl}
          alt={`${chapterTitle || 'Comic Page'} - Halaman ${pageNumber}`}
          onLoad={() => setIsLoaded(true)}
          onError={handleImageError}
          loading="lazy"
          className={`w-full h-auto object-contain block ${
            isLoaded ? 'opacity-100' : 'opacity-0 absolute'
          }`}
        />
      )}

      {/* Error Fallback Card */}
      {hasError && (
        <div className="w-full p-8 bg-slate-900/90 border border-red-900/30 rounded-lg flex flex-col items-center justify-center text-center space-y-3 my-4">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-xs text-slate-300 font-medium">
            Halaman {pageNumber} gagal dimuat.
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold rounded-md border border-slate-700/60 transition-colors cursor-pointer"
          >
            Muat Ulang Halaman
          </button>
        </div>
      )}
    </div>
  )
}
