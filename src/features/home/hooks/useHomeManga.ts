import { useState, useEffect, useCallback } from 'react'
import { getMangaList } from '@/services/komikuService'
import type { MangaListItem } from '@/types/komiku'

export interface UseHomeMangaReturn {
  mangaList: MangaListItem[]
  isLoading: boolean
  error: string | null
  currentPage: number
  searchQuery: string
  selectedGenre: string
  hasNextPage: boolean
  setCurrentPage: (page: number) => void
  handleSearch: (query: string) => void
  clearSearch: () => void
  handleSelectGenre: (genreSlug: string) => void
  refetch: () => void
}

export function useHomeManga(initialPage = 1): UseHomeMangaReturn {
  const [currentPage, setCurrentPageState] = useState<number>(initialPage)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [mangaList, setMangaList] = useState<MangaListItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)

  const fetchManga = useCallback(
    async (pageToFetch: number, queryToFetch: string, genreToFetch: string) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await getMangaList({
          page: pageToFetch,
          q: queryToFetch || undefined,
          genre: genreToFetch || undefined,
        })

        if (response && Array.isArray(response.results)) {
          setMangaList(response.results)
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
    },
    []
  )

  useEffect(() => {
    fetchManga(currentPage, searchQuery, selectedGenre)
  }, [currentPage, searchQuery, selectedGenre, fetchManga])

  const setCurrentPage = useCallback((page: number) => {
    if (page < 1) return
    setCurrentPageState(page)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const handleSearch = useCallback((query: string) => {
    const trimmed = query.trim()
    setSearchQuery(trimmed)
    setCurrentPageState(1)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const clearSearch = useCallback(() => {
    setSearchQuery('')
    setCurrentPageState(1)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const handleSelectGenre = useCallback((genreSlug: string) => {
    setSelectedGenre(genreSlug)
    setCurrentPageState(1)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const refetch = useCallback(() => {
    fetchManga(currentPage, searchQuery, selectedGenre)
  }, [currentPage, searchQuery, selectedGenre, fetchManga])

  return {
    mangaList,
    isLoading,
    error,
    currentPage,
    searchQuery,
    selectedGenre,
    hasNextPage,
    setCurrentPage,
    handleSearch,
    clearSearch,
    handleSelectGenre,
    refetch,
  }
}
