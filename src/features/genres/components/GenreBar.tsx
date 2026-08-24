import { useGenres } from '../hooks/useGenres'

export interface GenreBarProps {
  selectedGenre?: string
  onSelectGenre: (genreSlug: string) => void
}

export default function GenreBar({ selectedGenre = '', onSelectGenre }: GenreBarProps) {
  const { genres, isLoading, error, refetch } = useGenres()

  if (error) {
    return (
      <div className="flex items-center gap-3 p-3 bg-red-950/20 border border-red-900/30 rounded-xl text-xs text-red-400">
        <span>Gagal memuat genre.</span>
        <button
          type="button"
          onClick={refetch}
          className="underline font-semibold text-emerald-400 hover:text-emerald-300 cursor-pointer"
        >
          Coba lagi
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
        <span>Filter Genre</span>
        {selectedGenre && (
          <button
            type="button"
            onClick={() => onSelectGenre('')}
            className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer capitalize font-medium"
          >
            Reset Filter
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {/* 'Semua' Option */}
        <button
          type="button"
          onClick={() => onSelectGenre('')}
          disabled={isLoading}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
            !selectedGenre
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
          }`}
        >
          Semua Genre
        </button>

        {/* Loading Skeleton */}
        {isLoading &&
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-7 w-20 bg-slate-800/60 rounded-lg animate-pulse shrink-0"
            />
          ))}

        {/* Genre Items */}
        {!isLoading &&
          genres.map((genre) => {
            const isActive = selectedGenre === genre.slug
            return (
              <button
                key={genre.slug}
                type="button"
                onClick={() => onSelectGenre(genre.slug)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                {genre.name}
              </button>
            )
          })}
      </div>
    </div>
  )
}
