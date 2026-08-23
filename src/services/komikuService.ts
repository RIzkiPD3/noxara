import apiClient from '../lib/axios'
import { handleApiError } from '../lib/apiError'
import type {
  MangaListParams,
  MangaListResponse,
  MangaDetailResponse,
  MangaChapterResponse,
  MangaGenresResponse,
} from '../types/komiku'

/**
 * Service Layer for Komiku Scrap REST API
 */

/**
 * Mengambil daftar komik dengan filter opsional (halaman, pencarian, tipe, pengurutan)
 * Endpoint: GET /api/manga
 */
export async function getMangaList(params: MangaListParams = {}): Promise<MangaListResponse> {
  try {
    const response = await apiClient.get<MangaListResponse>('/api/manga', {
      params: {
        page: params.page ?? 1,
        ...(params.q ? { q: params.q } : {}),
        ...(params.type ? { type: params.type } : {}),
        ...(params.sort ? { sort: params.sort } : {}),
      },
    })
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Mengambil informasi detail komik berdasarkan slug
 * Endpoint: GET /api/manga/detail?slug={slug}
 */
export async function getMangaDetail(slug: string): Promise<MangaDetailResponse> {
  try {
    const response = await apiClient.get<MangaDetailResponse>('/api/manga/detail', {
      params: { slug },
    })
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Mengambil halaman gambar dan detail chapter berdasarkan slug chapter
 * Endpoint: GET /api/manga/chapter?slug={slug}
 */
export async function getMangaChapter(slug: string): Promise<MangaChapterResponse> {
  try {
    const response = await apiClient.get<MangaChapterResponse>('/api/manga/chapter', {
      params: { slug },
    })
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Mengambil daftar genre komik yang tersedia
 * Endpoint: GET /api/manga/genres
 */
export async function getMangaGenres(): Promise<MangaGenresResponse> {
  try {
    const response = await apiClient.get<MangaGenresResponse>('/api/manga/genres')
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Mendapatkan URL proxy gambar komik untuk menghindari CORS/Hotlinking restriction
 * Endpoint: GET /api/image?url={url}
 */
export function getImageProxyUrl(imageUrl: string): string {
  if (!imageUrl) return ''
  const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) || 'https://komiku-scrap.vercel.app'
  return `${baseUrl}/api/image?url=${encodeURIComponent(imageUrl)}`
}
