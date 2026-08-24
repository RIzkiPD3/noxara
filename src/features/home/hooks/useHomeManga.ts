import { useState, useEffect, useCallback } from 'react'
import { getMangaList } from '@/services/komikuService'
import type { MangaListItem } from '@/types/komiku'

export interface UseHomeMangaReturn {
  mangaList: MangaListItem[]
  isLoading: boolean
  error: string | null
  currentPage: number
  hasNextPage: boolean
  setCurrentPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  refetch: () => void
}

export function useHomeManga(initialPage = 1): UseHomeMangaReturn {
  const [currentPage, setCurrentPageState] = useState<number>(initialPage)
  const [mangaList, setMangaList] = useState<MangaListItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)

  const fetchManga = useCallback(async (pageToFetch: number) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await getMangaList({ page: pageToFetch })
      if (response && Array.isArray(response.results)) {
        setMangaList(response.results)
        // Assume next page is available if results are returned
        setHasNextPage(response.results.length > 0)
      } else {
        setMangaList([])
        setHasNextPage(false)
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
    fetchManga(currentPage)
  }, [currentPage, fetchManga])

  const setCurrentPage = useCallback((page: number) => {
    if (page < 1) return
    setCurrentPageState(page)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const nextPage = useCallback(() => {
    setCurrentPageState((prev) => {
      const next = prev + 1
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return next
    })
  }, [])

  const prevPage = useCallback(() => {
    setCurrentPageState((prev) => {
      if (prev <= 1) return 1
      const next = prev - 1
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return next
    })
  }, [])

  const refetch = useCallback(() => {
    fetchManga(currentPage)
  }, [currentPage, fetchManga])

  return {
    mangaList,
    isLoading,
    error,
    currentPage,
    hasNextPage,
    setCurrentPage,
    nextPage,
    prevPage,
    refetch,
  }
}
