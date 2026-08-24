/**
 * Types and interfaces for Komiku Scrap REST API
 * Base URL: https://komiku-scrap.vercel.app/
 */

export interface MangaListItem {
  title: string
  slug: string
  type: string
  latest_chapter: string
  thumbnail: string
  url: string
}

export interface MangaListParams {
  page?: number
  q?: string
  type?: string
  sort?: string
  genre?: string
}

export interface MangaListResponse {
  status: boolean
  count: number
  results: MangaListItem[]
}

export interface MangaGenreItem {
  name: string
  slug: string
  url: string
}

export interface MangaChapterItem {
  title: string
  slug: string
  release_date: string
  url: string
}

export interface MangaDetail {
  title: string
  slug: string
  alternative_title: string
  type: string
  theme: string
  status: string
  author: string
  rating: string
  views: string
  synopsis: string
  thumbnail: string
  genres: MangaGenreItem[]
  chapters_count: number
  chapters: MangaChapterItem[]
}

export interface MangaDetailResponse {
  status: boolean
  data: MangaDetail
}

export interface MangaChapterDetail {
  title: string
  slug: string
  images_count: number
  images: string[]
  prev_chapter: string | null
  next_chapter: string | null
}

export interface MangaChapterResponse {
  status: boolean
  data: MangaChapterDetail
}

export interface GenreItem {
  name: string
  slug: string
  url: string
}

export interface MangaGenresResponse {
  status: boolean
  count: number
  genres: GenreItem[]
}

export interface ApiErrorResponse {
  status?: boolean
  message?: string
  error?: string
}
