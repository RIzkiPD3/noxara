import { useState, useEffect, useCallback } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import HomePage from '@/features/home/HomePage'
import ComicLibraryPage from '@/features/library/ComicLibraryPage'
import GenreDirectoryPage from '@/features/genres/GenreDirectoryPage'
import BookmarkPage from '@/features/bookmarks/BookmarkPage'
import MangaDetailPage from '@/features/manga-detail/MangaDetailPage'
import ComicReaderPage from '@/features/reader/ComicReaderPage'
import EntrancePage from '@/features/entrance/EntrancePage'
import { ENTRANCE_CONFIG } from '@/features/entrance/config/entranceConfig'
import { useHomeManga } from '@/features/home/hooks/useHomeManga'

interface HashState {
  view: 'home' | 'library' | 'genres' | 'bookmarks' | 'detail' | 'reader'
  slug: string | null
}

function parseHash(): HashState {
  if (typeof window === 'undefined') return { view: 'home', slug: null }
  const hash = window.location.hash
  if (hash.startsWith('#/read/')) {
    const slug = hash.replace('#/read/', '').trim()
    return { view: 'reader', slug: slug || null }
  }
  if (hash.startsWith('#/manga/')) {
    const slug = hash.replace('#/manga/', '').trim()
    return { view: 'detail', slug: slug || null }
  }
  if (hash.startsWith('#/comics')) {
    return { view: 'library', slug: null }
  }
  if (hash.startsWith('#/genres')) {
    return { view: 'genres', slug: null }
  }
  if (hash.startsWith('#/bookmarks')) {
    return { view: 'bookmarks', slug: null }
  }
  return { view: 'home', slug: null }
}

export default function App() {
  const [isAccessGranted, setIsAccessGranted] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    try {
      return sessionStorage.getItem(ENTRANCE_CONFIG.storageKey) === 'true'
    } catch {
      return false
    }
  })

  const mangaState = useHomeManga()
  const [hashState, setHashState] = useState<HashState>(parseHash)
  const [selectedMangaSlug, setSelectedMangaSlug] = useState<string | null>(null)
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | undefined>(undefined)

  // Sync state on hashchange / popstate
  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseHash()
      setHashState(parsed)
      if (parsed.view === 'detail' && parsed.slug) {
        setSelectedMangaSlug(parsed.slug)
      }
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
    setSelectedMangaSlug(slug)
    if (thumbnail) setSelectedThumbnail(thumbnail)
    window.location.hash = `#/manga/${slug}`
  }, [])

  const handleSelectChapter = useCallback((chapterSlug: string) => {
    window.location.hash = `#/read/${chapterSlug}`
  }, [])

  const handleBackToHome = useCallback(() => {
    window.location.hash = ''
    setSelectedMangaSlug(null)
    setSelectedThumbnail(undefined)
  }, [])

  const handleBackFromReader = useCallback(() => {
    if (selectedMangaSlug) {
      window.location.hash = `#/manga/${selectedMangaSlug}`
    } else {
      window.location.hash = ''
    }
  }, [selectedMangaSlug])

  const handleGenreFromDetailOrDirectory = useCallback((genreSlug: string) => {
    window.location.hash = '#/comics'
    setSelectedMangaSlug(null)
    setSelectedThumbnail(undefined)
    mangaState.handleSelectGenre(genreSlug)
  }, [mangaState])

  const handleNavigateHome = useCallback(() => {
    window.location.hash = ''
    setSelectedMangaSlug(null)
    setSelectedThumbnail(undefined)
    mangaState.resetAllFilters()
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [mangaState])

  const handleNavigateLibrary = useCallback(() => {
    window.location.hash = '#/comics'
    setSelectedMangaSlug(null)
    setSelectedThumbnail(undefined)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const handleNavigateGenres = useCallback(() => {
    window.location.hash = '#/genres'
    setSelectedMangaSlug(null)
    setSelectedThumbnail(undefined)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const handleNavigateBookmarks = useCallback(() => {
    window.location.hash = '#/bookmarks'
    setSelectedMangaSlug(null)
    setSelectedThumbnail(undefined)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  // Gate Check: Show Entrance Page if access is not granted
  if (!isAccessGranted) {
    return <EntrancePage onAccessGranted={() => setIsAccessGranted(true)} />
  }

  return (
    <AppLayout
      searchQuery={mangaState.searchQuery}
      activeView={hashState.view}
      onSearch={(q) => {
        if (hashState.view !== 'home' && hashState.view !== 'library') {
          window.location.hash = '#/comics'
          setSelectedMangaSlug(null)
          setSelectedThumbnail(undefined)
        }
        mangaState.handleSearch(q)
      }}
      onNavigateHome={handleNavigateHome}
      onNavigateLibrary={handleNavigateLibrary}
      onNavigateGenres={handleNavigateGenres}
      onNavigateBookmarks={handleNavigateBookmarks}
    >
      {hashState.view === 'reader' && hashState.slug ? (
        <ComicReaderPage
          chapterSlug={hashState.slug}
          onBack={handleBackFromReader}
          onSelectChapter={handleSelectChapter}
        />
      ) : hashState.view === 'detail' && hashState.slug ? (
        <MangaDetailPage
          slug={hashState.slug}
          fallbackThumbnail={selectedThumbnail}
          onBack={handleBackToHome}
          onSelectGenre={handleGenreFromDetailOrDirectory}
          onSelectChapter={handleSelectChapter}
        />
      ) : hashState.view === 'library' ? (
        <ComicLibraryPage
          mangaState={mangaState}
          onSelectManga={handleSelectManga}
        />
      ) : hashState.view === 'genres' ? (
        <GenreDirectoryPage
          onSelectGenre={handleGenreFromDetailOrDirectory}
        />
      ) : hashState.view === 'bookmarks' ? (
        <BookmarkPage
          onSelectManga={handleSelectManga}
          onExploreComics={handleNavigateLibrary}
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
