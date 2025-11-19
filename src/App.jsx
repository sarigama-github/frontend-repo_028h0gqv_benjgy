import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import PoolCard from './components/PoolCard'
import PoolModal from './components/PoolModal'

function App() {
  const [pools, setPools] = useState([])
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState(null)
  const API = import.meta.env.VITE_BACKEND_URL || ""

  const loadPools = async (q = "") => {
    const url = new URL(`${API}/api/pools`)
    if (q) url.searchParams.set('q', q)
    try {
      const res = await fetch(url)
      const data = await res.json()
      setPools(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadPools()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen p-6 md:p-10 max-w-6xl mx-auto">
        <Hero onSearch={(q)=>{ setQuery(q); loadPools(q); }} />

        {pools.length === 0 ? (
          <div className="text-center text-blue-200">No pools yet. Add one via the API to see listings.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pools.map(p => (
              <PoolCard key={p.id} pool={p} onView={setSelected} />
            ))}
          </div>
        )}

        <PoolModal pool={selected} onClose={()=>setSelected(null)} />

        <footer className="mt-16 text-center text-sm text-blue-300/60">
          Built with love for swimmers and hosts
        </footer>
      </div>
    </div>
  )
}

export default App