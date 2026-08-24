import { useEntrance } from './hooks/useEntrance'
import EntranceForm from './components/EntranceForm'

export interface EntrancePageProps {
  onAccessGranted: () => void
}

export default function EntrancePage({ onAccessGranted }: EntrancePageProps) {
  const {
    passwordInput,
    errorWarning,
    isEntering,
    setPasswordInput,
    handleSubmit,
  } = useEntrance(onAccessGranted)

  return (
    <div
      className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden transition-all duration-500 ${
        isEntering ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glass Card Container */}
      <div className="relative z-10 w-full max-w-md bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8 text-center">
        
        {/* Header / Branding */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-1 shadow-inner">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight flex items-center justify-center gap-2">
            NOXARA
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Portal Baca Komik &amp; Manga Digital
          </p>
        </div>

        {/* Form Component */}
        <EntranceForm
          passwordInput={passwordInput}
          errorWarning={errorWarning}
          isEntering={isEntering}
          onPasswordChange={setPasswordInput}
          onSubmit={handleSubmit}
        />

        {/* Footer Note */}
        <div className="pt-2 border-t border-slate-800/60 text-[11px] text-slate-500">
          Noxara Digital Comic Reader &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  )
}
