import { useState, useCallback, type FormEvent } from 'react'
import { ENTRANCE_CONFIG } from '../config/entranceConfig'

export interface UseEntranceReturn {
  passwordInput: string
  errorWarning: string | null
  isEntering: boolean
  isAccessGranted: boolean
  setPasswordInput: (val: string) => void
  handleSubmit: (e?: FormEvent) => void
}

export function useEntrance(onGranted?: () => void): UseEntranceReturn {
  const [isAccessGranted, setIsAccessGranted] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    try {
      return sessionStorage.getItem(ENTRANCE_CONFIG.storageKey) === 'true'
    } catch {
      return false
    }
  })

  const [passwordInput, setPasswordInputState] = useState<string>('')
  const [errorWarning, setErrorWarning] = useState<string | null>(null)
  const [isEntering, setIsEntering] = useState<boolean>(false)

  const setPasswordInput = useCallback((val: string) => {
    setPasswordInputState(val)
    setErrorWarning(null)
  }, [])

  const handleSubmit = useCallback(
    (e?: FormEvent) => {
      if (e) e.preventDefault()
      if (isEntering) return

      const trimmed = passwordInput.trim()

      if (!trimmed) {
        setErrorWarning('Password tidak boleh kosong.')
        return
      }

      if (trimmed !== ENTRANCE_CONFIG.password) {
        setErrorWarning('Password salah. Silakan coba lagi.')
        return
      }

      // Password correct: Start entrance animation
      setErrorWarning(null)
      setIsEntering(true)

      setTimeout(() => {
        try {
          sessionStorage.setItem(ENTRANCE_CONFIG.storageKey, 'true')
        } catch {
          // Fallback if sessionStorage is disabled
        }
        setIsAccessGranted(true)
        setIsEntering(false)
        if (onGranted) onGranted()
      }, 600)
    },
    [passwordInput, isEntering, onGranted]
  )

  return {
    passwordInput,
    errorWarning,
    isEntering,
    isAccessGranted,
    setPasswordInput,
    handleSubmit,
  }
}
