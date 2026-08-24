import { useState, useEffect, useCallback } from 'react'
import type { BookmarkItem } from '../types/bookmark'

const STORAGE_KEY = 'noxara_bookmarks'

function getInitialBookmarks(): BookmarkItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return parsed.filter((item) => item && typeof item.slug === 'string')
    }
    return []
  } catch {
    return []
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(getInitialBookmarks)

  // Listen to window storage events to sync cross-tab/components
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setBookmarks(getInitialBookmarks())
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const isBookmarked = useCallback(
    (slug: string) => {
      if (!slug) return false
      return bookmarks.some((b) => b.slug === slug)
    },
    [bookmarks]
  )

  const addBookmark = useCallback(
    (item: Omit<BookmarkItem, 'savedAt'> | BookmarkItem) => {
      if (!item.slug) return
      setBookmarks((prev) => {
        if (prev.some((b) => b.slug === item.slug)) return prev
        const newItem: BookmarkItem = {
          ...item,
          savedAt: Date.now(),
        }
        const updated = [newItem, ...prev]
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        } catch {
          // Fallback
        }
        return updated
      })
    },
    []
  )

  const removeBookmark = useCallback((slug: string) => {
    if (!slug) return
    setBookmarks((prev) => {
      const updated = prev.filter((b) => b.slug !== slug)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch {
        // Fallback
      }
      return updated
    })
  }, [])

  const toggleBookmark = useCallback(
    (item: Omit<BookmarkItem, 'savedAt'> | BookmarkItem) => {
      if (!item.slug) return
      if (isBookmarked(item.slug)) {
        removeBookmark(item.slug)
      } else {
        addBookmark(item)
      }
    },
    [isBookmarked, addBookmark, removeBookmark]
  )

  return {
    bookmarks,
    totalBookmarks: bookmarks.length,
    isBookmarked,
    addBookmark,
    removeBookmark,
    toggleBookmark,
  }
}
