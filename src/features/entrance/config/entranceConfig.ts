export const ENTRANCE_CONFIG = {
  password: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ENTRANCE_PASSWORD) || 'admin123',
  storageKey: 'noxara_entrance_granted',
} as const
