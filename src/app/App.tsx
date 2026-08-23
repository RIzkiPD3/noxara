import AppLayout from '@/components/layout/AppLayout'

export default function App() {
  return (
    <AppLayout>
      <div className="border border-dashed border-slate-800 rounded-xl p-8 text-center bg-slate-900/40">
        <h1 className="text-2xl font-bold text-slate-100 mb-2">
          Application Layout Noxara
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Kerangka visual global (Navbar, Main Content Area, & Footer) telah siap digunakan untuk fitur-fitur selanjutnya.
        </p>
      </div>
    </AppLayout>
  )
}
