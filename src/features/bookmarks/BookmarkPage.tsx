import { useBookmarks } from './hooks/useBookmarks'
import ComicGrid from '@/features/home/components/ComicGrid'

export interface BookmarkPageProps {
  onSelectManga?: (slug: string, thumbnail?: string) => void
  onExploreComics?: () => void
}

export default function BookmarkPage({ onSelectManga, onExploreComics }: BookmarkPageProps) {
  const { bookmarks, totalBookmarks } = useBookmarks()

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
            <span className="w-2 h-7 bg-emerald-500 rounded-full inline-block" />
            Koleksi Bookmark
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60 ml-2">
              {totalBookmarks} Komik
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Daftar komik favorit yang telah Anda simpan di Noxara
          </p>
        </div>

        {onExploreComics && (
          <button
            type="button"
            onClick={onExploreComics}
            className="self-start sm:self-auto px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-emerald-400 transition-all cursor-pointer"
          >
            + Tambah Komik Lagi
          </button>
        )}
      </div>

      {/* Empty State */}
      {totalBookmarks === 0 ? (
        <div className="border border-slate-800 bg-slate-900/40 rounded-2xl p-10 sm:p-14 text-center max-w-md mx-auto my-12 space-y-4 shadow-xl">
          <div className="w-14 h-14 bg-slate-800/80 text-emerald-400 rounded-2xl border border-slate-700/60 flex items-center justify-center mx-auto shadow-inner">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-200">Belum Ada Bookmark</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Anda belum menyimpan komik apa pun ke daftar favorit. Temukan komik menarik dan tekan tombol bookmark untuk menyimpannya.
            </p>
          </div>
          {onExploreComics && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onExploreComics}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/10 cursor-pointer"
              >
                Jelajahi Katalog Komik
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Saved Bookmarks Grid */
        <ComicGrid items={bookmarks} onSelectManga={onSelectManga} />
      )}
    </section>
  )
}
