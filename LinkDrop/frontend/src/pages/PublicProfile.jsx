import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'

export default function PublicProfile() {
  const { username } = useParams()
  const [data, setData] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    api.get(`/links/profile/${username}`)
      .then(r => setData(r.data))
      .catch(() => setNotFound(true))
  }, [username])

  const handleClick = async (id, url) => {
    await api.post(`/links/${id}/click`)
    window.open(url, '_blank', 'noopener')
  }

  if (notFound) return (
    <div className="min-h-screen bg-[#f8f7ff] flex flex-col items-center justify-center gap-2">
      <p className="text-violet-400 font-medium">Profil introuvable</p>
      <p className="text-violet-300 text-sm">@{username} n'existe pas</p>
    </div>
  )

  if (!data) return (
    <div className="min-h-screen bg-[#f8f7ff] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-violet-300 border-t-violet-600 rounded-full animate-spin"/>
    </div>
  )

  const initials = data.user.username.slice(0, 2).toUpperCase()

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-[#f8f7ff] flex flex-col items-center px-4 py-14">

      <div className="w-16 h-16 rounded-2xl bg-violet-600 flex items-center justify-center text-white text-xl font-bold mb-3 shadow-sm">
        {initials}
      </div>
      <h1 className="text-lg font-bold text-violet-950">@{data.user.username}</h1>
      <p className="text-violet-400 text-sm mt-1 mb-8">Mes liens</p>

      <div className="w-full max-w-sm space-y-3">
        {data.links.map(link => (
          <button key={link.id} onClick={() => handleClick(link.id, link.url)}
            className="w-full bg-white border border-violet-100 rounded-2xl py-4 px-5 text-sm font-medium text-violet-900 shadow-sm hover:shadow-md hover:border-violet-300 hover:-translate-y-0.5 transition-all text-center">
            {link.title}
          </button>
        ))}
      </div>

      {data.links.length === 0 && (
        <p className="text-violet-300 text-sm mt-8">Aucun lien pour l'instant</p>
      )}

      <p className="text-xs text-violet-200 mt-12">
        Créé avec <span className="text-violet-400 font-medium">LinkDrop</span>
      </p>
    </div>
  )
}