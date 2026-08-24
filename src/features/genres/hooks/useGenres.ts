import { useState, useEffect, useCallback } from 'react'
import { getMangaGenres } from '@/services/komikuService'
import type { GenreItem } from '@/types/komiku'

export interface UseGenresReturn {
  genres: GenreItem[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useGenres(): UseGenresReturn {
  const [genres, setGenres] = useState<GenreItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGenres = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await getMangaGenres()
      if (response && Array.isArray(response.genres)) {
        setGenres(response.genres)
      } else {
        setGenres([])
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Gagal memuat daftar genre.'
      setError(errorMessage)
      setGenres([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchGenres()
  }, [fetchGenres])

  return {
    genres,
    isLoading,
    error,
    refetch: fetchGenres,
  }
}
