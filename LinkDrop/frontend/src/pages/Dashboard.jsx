import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import api from '../api'
import LinkCard from '../components/LinkCard'

export default function Dashboard() {
  const [links, setLinks] = useState([])
  const [form, setForm] = useState({ title: '', url: '' })
  const [loading, setLoading] = useState(false)
  const username = localStorage.getItem('username')
  const navigate = useNavigate()
  const totalClicks = links.reduce((s, l) => s + (l.clicks || 0), 0)

  useEffect(() => { api.get('/links').then(r => setLinks(r.data)) }, [])

  const addLink = async e => {
    e.preventDefault()
    setLoading(true)
    const { data } = await api.post('/links', form)
    setLinks([...links, data])
    setForm({ title: '', url: '' })
    setLoading(false)
  }

  const deleteLink = async id => {
    await api.delete(`/links/${id}`)
    setLinks(links.filter(l => l.id !== id))
  }

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return
    const oldI = links.findIndex(l => l.id === active.id)
    const newI = links.findIndex(l => l.id === over.id)
    setLinks(arrayMove(links, oldI, newI))
  }

  return (
    <div className="min-h-screen bg-[#f8f7ff]">
      <header className="bg-white border-b border-violet-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M7 9a3.5 3.5 0 005.25.38l2-2a3.5 3.5 0 00-4.95-4.95l-1.14 1.14"/>
                <path d="M9 7a3.5 3.5 0 00-5.25-.38l-2 2a3.5 3.5 0 004.95 4.95L7.7 12.43"/>
              </svg>
            </div>
            <span className="font-bold text-violet-950">LinkDrop</span>
          </div>
          <div className="flex items-center gap-3">
            <a href={`/${username}`} target="_blank"
              className="text-xs text-violet-500 bg-violet-50 px-3 py-1.5 rounded-full hover:bg-violet-100 transition">
              Voir ma page
            </a>
            <button onClick={() => { localStorage.clear(); navigate('/login') }}
              className="text-xs text-violet-300 hover:text-violet-500 transition">
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 space-y-6">

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl border border-violet-100 p-4">
            <p className="text-xs text-violet-300 mb-1">Liens actifs</p>
            <p className="text-2xl font-bold text-violet-600">{links.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-violet-100 p-4">
            <p className="text-xs text-violet-300 mb-1">Clics totaux</p>
            <p className="text-2xl font-bold text-violet-600">{totalClicks}</p>
          </div>
        </div>

        <div className="card p-5">
          <h2 className="text-sm font-semibold text-violet-950 mb-4">Ajouter un lien</h2>
          <form onSubmit={addLink} className="space-y-3">
            <input className="input-field" placeholder="Titre — ex: Mon portfolio"
              value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <input className="input-field" placeholder="URL — ex: https://monsite.com"
              value={form.url} onChange={e => setForm({ ...form, url: e.target.value })}
              type="url" required />
            <button className="btn-primary" disabled={loading}>
              {loading ? 'Ajout...' : '+ Ajouter le lien'}
            </button>
          </form>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-violet-950">Mes liens</h2>
            <span className="text-xs text-violet-300">Glisse pour réordonner</span>
          </div>

          {links.length === 0 ? (
            <div className="card p-10 text-center">
              <p className="text-violet-300 text-sm">Aucun lien pour l'instant</p>
              <p className="text-violet-200 text-xs mt-1">Ajoute ton premier lien ci-dessus</p>
            </div>
          ) : (
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={links.map(l => l.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {links.map(link => <LinkCard key={link.id} link={link} onDelete={deleteLink} />)}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </main>
    </div>
  )
}