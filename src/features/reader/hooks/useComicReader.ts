import { useState, useEffect, useCallback } from 'react'
import { getMangaChapter } from '@/services/komikuService'
import type { MangaChapterDetail } from '@/types/komiku'

export interface UseComicReaderReturn {
  chapterData: MangaChapterDetail | null
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useComicReader(chapterSlug: string | null): UseComicReaderReturn {
  const [chapterData, setChapterData] = useState<MangaChapterDetail | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(chapterSlug))
  const [error, setError] = useState<string | null>(null)

  const fetchChapter = useCallback(async () => {
    if (!chapterSlug) {
      setChapterData(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await getMangaChapter(chapterSlug)
      if (response && response.status && response.data) {
        setChapterData(response.data)
      } else {
        setChapterData(null)
        setError('Chapter komik tidak ditemukan.')
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Gagal memuat chapter komik. Silakan periksa koneksi internet Anda.'
      setError(errorMessage)
      setChapterData(null)
    } finally {
      setIsLoading(false)
    }
  }, [chapterSlug])

  useEffect(() => {
    fetchChapter()
  }, [fetchChapter])

  return {
    chapterData,
    isLoading,
    error,
    refetch: fetchChapter,
  }
}
