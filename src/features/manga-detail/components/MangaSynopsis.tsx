export interface MangaSynopsisProps {
  synopsis?: string
}

export default function MangaSynopsis({ synopsis }: MangaSynopsisProps) {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-3">
      <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
        <span className="w-1.5 h-5 bg-emerald-500 rounded-full inline-block" />
        Sinopsis Komik
      </h2>

      {synopsis ? (
        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line font-sans">
          {synopsis}
        </p>
      ) : (
        <p className="text-sm text-slate-500 italic">
          Sinopsis belum tersedia untuk komik ini.
        </p>
      )}
    </div>
  )
}
