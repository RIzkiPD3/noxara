import axios from 'axios'

export class ApiError extends Error {
  public statusCode?: number
  public isNetworkError: boolean
  public rawError?: unknown

  constructor(message: string, statusCode?: number, isNetworkError = false, rawError?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.isNetworkError = isNetworkError
    this.rawError = rawError

    // Restore prototype chain
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

export function handleApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with non-2xx status code
      const status = error.response.status
      const data = error.response.data

      const message =
        typeof data === 'object' && data !== null && 'message' in data && typeof data.message === 'string'
          ? data.message
          : `Gagal mengambil data dari server (${status})`

      return new ApiError(message, status, false, error)
    }

    if (error.request) {
      // Request was made but no response was received (Network / Timeout error)
      return new ApiError(
        'Gagal terhubung ke server Komiku API. Periksa koneksi internet Anda.',
        undefined,
        true,
        error
      )
    }

    return new ApiError(error.message || 'Terjadi kesalahan pada konfigurasi request API.', undefined, false, error)
  }

  if (error instanceof Error) {
    return new ApiError(error.message, undefined, false, error)
  }

  return new ApiError('Terjadi kesalahan yang tidak diketahui saat menghubungi API.', undefined, false, error)
}
