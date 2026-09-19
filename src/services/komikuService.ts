import apiClient from '../lib/axios'
import { handleApiError } from '../lib/apiError'
import type {
  MangaListItem,
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
 * Helper untuk membersihkan judul komik dari akhiran "Chapter X" yang tidak perlu
 */
export function cleanMangaTitle(title: string): string {
  if (!title) return ''
  const cleaned = title.replace(/\s+Chapter\s+[\d\.]+\s*$/i, '').trim()
  return cleaned || title
}

const detailCache = new Map<string, Promise<MangaDetailResponse>>()

const GENRE_KEYWORD_MAP: Record<string, string[]> = {
  action: ['action', 'aksi'],
  adventure: ['adventure', 'petualangan'],
  comedy: ['comedy', 'komedi'],
  cultivation: ['cultivation', 'cultivate'],
  demon: ['demon', 'iblis'],
  drama: ['drama'],
  ecchi: ['ecchi'],
  fantasy: ['fantasy', 'fantasi'],
  game: ['game', 'rpg'],
  'gender-bender': ['gender bender', 'gender'],
  harem: ['harem'],
  historical: ['historical', 'kerajaan', 'sejarah'],
  horror: ['horror', 'horor'],
  isekai: ['isekai'],
  josei: ['josei'],
  magic: ['magic', 'sihir', 'maho'],
  'martial-arts': ['martial arts', 'martial', 'beladiri'],
  mecha: ['mecha', 'robot'],
  medical: ['doctor', 'medical', 'dokter'],
  military: ['military', 'militer'],
  monsters: ['monster'],
  music: ['music', 'musik'],
  mystery: ['mystery', 'misteri'],
  'post-apocalyptic': ['apocalyptic', 'apocalypse'],
  psychological: ['psychological', 'psikologi'],
  reincarnation: ['reincarnation', 'reinkarnasi'],
  'reverse-harem': ['reverse harem'],
  romance: ['romance', 'romantis', 'cinta'],
  school: ['school', 'sekolah', 'high school'],
  'sci-fi': ['science', 'cyberpunk', 'futuristic', 'sci-fi'],
  seinen: ['seinen'],
  shoujo: ['shoujo'],
  shounen: ['shounen'],
  'slice-of-life': ['slice of life', 'life', 'sehari-hari'],
  space: ['space', 'angkasa'],
  sports: ['sports', 'sport', 'olahraga'],
  superhero: ['hero', 'pahlawan'],
  supernatural: ['supernatural', 'gaib', 'hantu'],
  superpower: ['superpower', 'power'],
  survival: ['survival'],
  system: ['system', 'sistem'],
  thriller: ['thriller', 'misteri'],
  'time-travel': ['time travel', 'waktu'],
  tragedy: ['tragedy', 'sedih'],
  urban: ['urban'],
  vampire: ['vampire', 'vampir'],
  'virtual-reality': ['virtual', 'vr'],
  webtoons: ['webtoon'],
  zombies: ['zombie', 'zombi'],
}

/**
 * Mengambil daftar komik dengan filter opsional (halaman, pencarian, tipe, pengurutan, genre)
 * Endpoint: GET /api/manga
 */
export async function getMangaList(params: MangaListParams = {}): Promise<MangaListResponse> {
  try {
    // Jika ada filter genre tetapi tidak ada query pencarian khusus params.q
    if (params.genre && !params.q) {
      const genreKey = params.genre.toLowerCase().trim()
      const searchKeywords = GENRE_KEYWORD_MAP[genreKey] || [genreKey.replace(/-/g, ' ')]

      const responses = await Promise.allSettled(
        searchKeywords.map((kw) =>
          apiClient.get<MangaListResponse>('/api/manga', {
            params: {
              page: params.page ?? 1,
              q: kw,
              ...(params.type ? { type: params.type } : {}),
              ...(params.sort ? { sort: params.sort } : {}),
            },
          })
        )
      )

      const collectedItems: MangaListItem[] = []
      responses.forEach((res) => {
        if (
          res.status === 'fulfilled' &&
          res.value?.data &&
          Array.isArray(res.value.data.results)
        ) {
          collectedItems.push(...res.value.data.results)
        }
      })

      // Deduplikasi berdasarkan slug
      const uniqueMap = new Map<string, MangaListItem>()
      collectedItems.forEach((item) => {
        if (item && item.slug && !uniqueMap.has(item.slug)) {
          uniqueMap.set(item.slug, {
            ...item,
            title: cleanMangaTitle(item.title),
          })
        }
      })

      let results = Array.from(uniqueMap.values())

      // Filter berdasarkan tipe jika parameter type ada
      if (params.type) {
        const typeLower = params.type.toLowerCase()
        results = results.filter((item) => item.type?.toLowerCase().includes(typeLower))
      }

      return {
        status: true,
        count: results.length,
        results,
      }
    }

    // Pemanggilan standar (tanpa filter genre khusus, atau jika pencarian q diisi)
    const response = await apiClient.get<MangaListResponse>('/api/manga', {
      params: {
        page: params.page ?? 1,
        ...(params.q ? { q: params.q } : {}),
        ...(params.type ? { type: params.type } : {}),
        ...(params.sort ? { sort: params.sort } : {}),
        ...(params.genre ? { genre: params.genre } : {}),
      },
    })
    if (response.data && Array.isArray(response.data.results)) {
      response.data.results = response.data.results.map((item) => ({
        ...item,
        title: cleanMangaTitle(item.title),
      }))
    }
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Mengambil informasi detail komik berdasarkan slug (dengan caching in-memory)
 * Endpoint: GET /api/manga/detail?slug={slug}
 */
export async function getMangaDetail(slug: string): Promise<MangaDetailResponse> {
  if (!slug) {
    throw new Error('Slug is required')
  }
  if (detailCache.has(slug)) {
    return detailCache.get(slug)!
  }

  const promise = (async () => {
    try {
      const response = await apiClient.get<MangaDetailResponse>('/api/manga/detail', {
        params: { slug },
      })
      return response.data
    } catch (error) {
      detailCache.delete(slug)
      throw handleApiError(error)
    }
  })()

  detailCache.set(slug, promise)
  return promise
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
  const cleanUrl = imageUrl.split('?')[0].split('#')[0]
  const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) || 'https://komiku-scrap.vercel.app'
  return `${baseUrl}/api/image?url=${encodeURIComponent(cleanUrl)}`
}

