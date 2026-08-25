import { useState, useEffect, useCallback, useMemo } from 'react'
import { getMangaList } from '@/services/komikuService'
import type { MangaListItem } from '@/types/komiku'

const ITEMS_PER_PAGE = 6

export interface UseHomeMangaReturn {
  mangaList: MangaListItem[]
  isLoading: boolean
  error: string | null
  currentPage: number
  searchQuery: string
  selectedGenre: string
  selectedType: string
  selectedSort: string
  hasNextPage: boolean
  hasActiveFilters: boolean
  setCurrentPage: (page: number) => void
  handleSearch: (query: string) => void
  clearSearch: () => void
  handleSelectGenre: (genreSlug: string) => void
  handleSelectType: (type: string) => void
  handleSelectSort: (sort: string) => void
  resetAllFilters: () => void
  refetch: () => void
}

export function useHomeManga(initialPage = 1): UseHomeMangaReturn {
  const [currentPage, setCurrentPageState] = useState<number>(initialPage)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedSort, setSelectedSort] = useState<string>('')
  const [allMangaList, setAllMangaList] = useState<MangaListItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const hasActiveFilters = Boolean(searchQuery || selectedGenre || selectedType || selectedSort)

  const fetchManga = useCallback(
    async (
      queryToFetch: string,
      genreToFetch: string,
      typeToFetch: string,
      sortToFetch: string
    ) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await getMangaList({
          page: 1,
          q: queryToFetch || undefined,
          genre: genreToFetch || undefined,
          type: typeToFetch || undefined,
          sort: sortToFetch || undefined,
        })

        if (response && Array.isArray(response.results)) {
          setAllMangaList(response.results)
        } else {
          setAllMangaList([])
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Gagal memuat daftar komik. Silakan periksa koneksi internet Anda.'
        setError(errorMessage)
        setAllMangaList([])
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  useEffect(() => {
    fetchManga(searchQuery, selectedGenre, selectedType, selectedSort)
  }, [searchQuery, selectedGenre, selectedType, selectedSort, fetchManga])

  // Derive slice for current page
  const mangaList = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return allMangaList.slice(start, start + ITEMS_PER_PAGE)
  }, [allMangaList, currentPage])

  // hasNextPage condition based on total items available
  const hasNextPage = useMemo(() => {
    return currentPage * ITEMS_PER_PAGE < allMangaList.length
  }, [allMangaList.length, currentPage])

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

  const handleSelectType = useCallback((type: string) => {
    setSelectedType(type)
    setCurrentPageState(1)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const handleSelectSort = useCallback((sort: string) => {
    setSelectedSort(sort)
    setCurrentPageState(1)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const resetAllFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedGenre('')
    setSelectedType('')
    setSelectedSort('')
    setCurrentPageState(1)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const refetch = useCallback(() => {
    fetchManga(searchQuery, selectedGenre, selectedType, selectedSort)
  }, [searchQuery, selectedGenre, selectedType, selectedSort, fetchManga])

  return {
    mangaList,
    isLoading,
    error,
    currentPage,
    searchQuery,
    selectedGenre,
    selectedType,
    selectedSort,
    hasNextPage,
    hasActiveFilters,
    setCurrentPage,
    handleSearch,
    clearSearch,
    handleSelectGenre,
    handleSelectType,
    handleSelectSort,
    resetAllFilters,
    refetch,
  }
}
