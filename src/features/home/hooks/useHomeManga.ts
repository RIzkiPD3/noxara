import { useState, useEffect, useCallback } from 'react'
import { getMangaList } from '@/services/komikuService'
import type { MangaListItem } from '@/types/komiku'

export interface UseHomeMangaReturn {
  mangaList: MangaListItem[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useHomeManga(): UseHomeMangaReturn {
  const [mangaList, setMangaList] = useState<MangaListItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchManga = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await getMangaList({ page: 1 })
      if (response && Array.isArray(response.results)) {
        setMangaList(response.results)
      } else {
        setMangaList([])
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Gagal memuat daftar komik. Silakan periksa koneksi internet Anda.'
      setError(errorMessage)
      setMangaList([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchManga()
  }, [fetchManga])

  return {
    mangaList,
    isLoading,
    error,
    refetch: fetchManga,
  }
}
