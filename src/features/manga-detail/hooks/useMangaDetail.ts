import { useState, useEffect, useCallback } from 'react'
import { getMangaDetail, getMangaList } from '@/services/komikuService'
import type { MangaDetail } from '@/types/komiku'

export interface UseMangaDetailReturn {
  mangaDetail: MangaDetail | null
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useMangaDetail(slug: string | null, fallbackCover?: string): UseMangaDetailReturn {
  const [mangaDetail, setMangaDetail] = useState<MangaDetail | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(slug))
  const [error, setError] = useState<string | null>(null)

  const fetchDetail = useCallback(async () => {
    if (!slug) {
      setMangaDetail(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await getMangaDetail(slug)
      if (response && response.status && response.data) {
        const detailData = { ...response.data }

        // If thumbnail is missing from detail response, attempt fallback lookup
        if (!detailData.thumbnail) {
          if (fallbackCover) {
            detailData.thumbnail = fallbackCover
          } else if (detailData.title) {
            try {
              const searchRes = await getMangaList({ q: detailData.title })
              if (searchRes && searchRes.results && searchRes.results.length > 0) {
                const match = searchRes.results.find((m) => m.slug === slug) || searchRes.results[0]
                if (match?.thumbnail) {
                  detailData.thumbnail = match.thumbnail
                }
              }
            } catch {
              // Ignore search fallback error
            }
          }
        }

        setMangaDetail(detailData)
      } else {
        setMangaDetail(null)
        setError('Detail komik tidak ditemukan.')
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Gagal memuat detail komik. Silakan periksa koneksi internet Anda.'
      setError(errorMessage)
      setMangaDetail(null)
    } finally {
      setIsLoading(false)
    }
  }, [slug, fallbackCover])

  useEffect(() => {
    fetchDetail()
  }, [fetchDetail])

  return {
    mangaDetail,
    isLoading,
    error,
    refetch: fetchDetail,
  }
}
