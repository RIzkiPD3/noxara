import { useState, useEffect, useCallback } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import HomePage from '@/features/home/HomePage'
import MangaDetailPage from '@/features/manga-detail/MangaDetailPage'
import { useHomeManga } from '@/features/home/hooks/useHomeManga'

function getSlugFromHash(): string | null {
  if (typeof window === 'undefined') return null
  const hash = window.location.hash
  if (hash.startsWith('#/manga/')) {
    const slug = hash.replace('#/manga/', '').trim()
    return slug || null
  }
  return null
}

export default function App() {
  const mangaState = useHomeManga()
  const [selectedSlug, setSelectedSlug] = useState<string | null>(getSlugFromHash)
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | undefined>(undefined)

  // Listen to hash change & popstate (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const slug = getSlugFromHash()
      setSelectedSlug(slug)
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('popstate', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('popstate', handleHashChange)
    }
  }, [])

  const handleSelectManga = useCallback((slug: string, thumbnail?: string) => {
    window.location.hash = `#/manga/${slug}`
    setSelectedSlug(slug)
    if (thumbnail) {
      setSelectedThumbnail(thumbnail)
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const handleBackToHome = useCallback(() => {
    window.location.hash = ''
    setSelectedSlug(null)
    setSelectedThumbnail(undefined)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const handleGenreFromDetail = useCallback((genreSlug: string) => {
    window.location.hash = ''
    setSelectedSlug(null)
    setSelectedThumbnail(undefined)
    mangaState.handleSelectGenre(genreSlug)
  }, [mangaState])

  return (
    <AppLayout
      searchQuery={mangaState.searchQuery}
      onSearch={(q) => {
        // If searching while on detail page, navigate back to home with search query
        if (selectedSlug) {
          window.location.hash = ''
          setSelectedSlug(null)
          setSelectedThumbnail(undefined)
        }
        mangaState.handleSearch(q)
      }}
    >
      {selectedSlug ? (
        <MangaDetailPage
          slug={selectedSlug}
          fallbackThumbnail={selectedThumbnail}
          onBack={handleBackToHome}
          onSelectGenre={handleGenreFromDetail}
        />
      ) : (
        <HomePage
          mangaState={mangaState}
          onSelectManga={handleSelectManga}
        />
      )}
    </AppLayout>
  )
}
