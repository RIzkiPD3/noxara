import { useState, useEffect, useCallback } from 'react'
import { getMangaGenres } from '@/services/komikuService'
import type { GenreItem } from '@/types/komiku'

export const DEFAULT_POPULAR_GENRES: GenreItem[] = [
  { name: 'Action', slug: 'action', url: '' },
  { name: 'Adventure', slug: 'adventure', url: '' },
  { name: 'Comedy', slug: 'comedy', url: '' },
  { name: 'Cultivation', slug: 'cultivation', url: '' },
  { name: 'Demon', slug: 'demon', url: '' },
  { name: 'Drama', slug: 'drama', url: '' },
  { name: 'Ecchi', slug: 'ecchi', url: '' },
  { name: 'Fantasy', slug: 'fantasy', url: '' },
  { name: 'Game', slug: 'game', url: '' },
  { name: 'Gender Bender', slug: 'gender-bender', url: '' },
  { name: 'Harem', slug: 'harem', url: '' },
  { name: 'Historical', slug: 'historical', url: '' },
  { name: 'Horror', slug: 'horror', url: '' },
  { name: 'Isekai', slug: 'isekai', url: '' },
  { name: 'Josei', slug: 'josei', url: '' },
  { name: 'Magic', slug: 'magic', url: '' },
  { name: 'Martial Arts', slug: 'martial-arts', url: '' },
  { name: 'Mecha', slug: 'mecha', url: '' },
  { name: 'Medical', slug: 'medical', url: '' },
  { name: 'Military', slug: 'military', url: '' },
  { name: 'Monsters', slug: 'monsters', url: '' },
  { name: 'Music', slug: 'music', url: '' },
  { name: 'Mystery', slug: 'mystery', url: '' },
  { name: 'Post-Apocalyptic', slug: 'post-apocalyptic', url: '' },
  { name: 'Psychological', slug: 'psychological', url: '' },
  { name: 'Reincarnation', slug: 'reincarnation', url: '' },
  { name: 'Reverse Harem', slug: 'reverse-harem', url: '' },
  { name: 'Romance', slug: 'romance', url: '' },
  { name: 'School', slug: 'school', url: '' },
  { name: 'Sci-Fi', slug: 'sci-fi', url: '' },
  { name: 'Seinen', slug: 'seinen', url: '' },
  { name: 'Shoujo', slug: 'shoujo', url: '' },
  { name: 'Shounen', slug: 'shounen', url: '' },
  { name: 'Slice of Life', slug: 'slice-of-life', url: '' },
  { name: 'Space', slug: 'space', url: '' },
  { name: 'Sports', slug: 'sports', url: '' },
  { name: 'Superhero', slug: 'superhero', url: '' },
  { name: 'Supernatural', slug: 'supernatural', url: '' },
  { name: 'Superpower', slug: 'superpower', url: '' },
  { name: 'Survival', slug: 'survival', url: '' },
  { name: 'System', slug: 'system', url: '' },
  { name: 'Thriller', slug: 'thriller', url: '' },
  { name: 'Time Travel', slug: 'time-travel', url: '' },
  { name: 'Tragedy', slug: 'tragedy', url: '' },
  { name: 'Urban', slug: 'urban', url: '' },
  { name: 'Vampire', slug: 'vampire', url: '' },
  { name: 'Virtual Reality', slug: 'virtual-reality', url: '' },
  { name: 'Webtoons', slug: 'webtoons', url: '' },
  { name: 'Zombies', slug: 'zombies', url: '' },
]

export interface UseGenresReturn {
  genres: GenreItem[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useGenres(): UseGenresReturn {
  const [genres, setGenres] = useState<GenreItem[]>(DEFAULT_POPULAR_GENRES)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGenres = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await getMangaGenres()
      const apiGenres = response && Array.isArray(response.genres) ? response.genres : []
      
      // Combine API genres with default popular genres without duplicates
      const genreMap = new Map<string, GenreItem>()
      
      // Insert API genres first
      apiGenres.forEach((g) => {
        if (g.slug) genreMap.set(g.slug.toLowerCase(), g)
      })
      
      // Insert defaults if not present
      DEFAULT_POPULAR_GENRES.forEach((g) => {
        if (!genreMap.has(g.slug.toLowerCase())) {
          genreMap.set(g.slug.toLowerCase(), g)
        }
      })

      const combined = Array.from(genreMap.values())
      setGenres(combined)
    } catch {
      // In case of network error, fallback gracefully to default popular genres
      setGenres(DEFAULT_POPULAR_GENRES)
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
