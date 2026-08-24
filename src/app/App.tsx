import AppLayout from '@/components/layout/AppLayout'
import HomePage from '@/features/home/HomePage'
import { useHomeManga } from '@/features/home/hooks/useHomeManga'

export default function App() {
  const mangaState = useHomeManga()

  return (
    <AppLayout
      searchQuery={mangaState.searchQuery}
      onSearch={mangaState.handleSearch}
    >
      <HomePage mangaState={mangaState} />
    </AppLayout>
  )
}
