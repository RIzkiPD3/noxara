import { useState, type FormEvent } from 'react'

export interface EntranceFormProps {
  passwordInput: string
  errorWarning: string | null
  isEntering: boolean
  onPasswordChange: (val: string) => void
  onSubmit: (e?: FormEvent) => void
}

export default function EntranceForm({
  passwordInput,
  errorWarning,
  isEntering,
  onPasswordChange,
  onSubmit,
}: EntranceFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <form onSubmit={onSubmit} className="w-full space-y-5">
      {/* Password Input Container */}
      <div className="space-y-2 text-left">
        <label htmlFor="entrance-password" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Password Akses
        </label>
        <div className="relative flex items-center">
          <input
            id="entrance-password"
            type={showPassword ? 'text' : 'password'}
            value={passwordInput}
            onChange={(e) => onPasswordChange(e.target.value)}
            disabled={isEntering}
            placeholder="Masukkan password..."
            autoFocus
            className={`w-full pl-4 pr-11 py-3 bg-slate-950/80 border rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none transition-all duration-200 text-sm font-medium ${
              errorWarning
                ? 'border-red-800 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-slate-800 hover:border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            title={showPassword ? 'Sembunyikan Password' : 'Tampilkan Password'}
            className="absolute right-3 p-1.5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            {showPassword ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Warning Box */}
      {errorWarning && (
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-950/40 border border-red-900/60 text-xs font-medium text-red-400">
          <svg className="w-4 h-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{errorWarning}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isEntering}
        className={`w-full py-3.5 px-6 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
          isEntering
            ? 'bg-emerald-600 text-slate-950 shadow-emerald-500/20 opacity-90'
            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 hover:shadow-emerald-500/30 active:scale-[0.99]'
        }`}
      >
        {isEntering ? (
          <>
            <svg className="w-4 h-4 animate-spin text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Membuka Gerbang...</span>
          </>
        ) : (
          <>
            <span>Masuk Ke Noxara</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  )
}
