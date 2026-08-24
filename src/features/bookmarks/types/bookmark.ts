export interface BookmarkItem {
  slug: string
  title: string
  thumbnail: string
  latest_chapter?: string
  type?: string
  url?: string
  savedAt: number
}
