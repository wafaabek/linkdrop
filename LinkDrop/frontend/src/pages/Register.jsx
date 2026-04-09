import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api'

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.post('/auth/register', form)
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.user.username)
      navigate('/dashboard')
    } catch {
      setError('Nom d\'utilisateur ou email déjà pris')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f7ff] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-violet-600 rounded-2xl mb-4">
            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-violet-950">LinkDrop</h1>
          <p className="text-violet-400 text-sm mt-1">Crée ta page de liens en 30 secondes</p>
        </div>

        <div className="card p-8">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-500 text-sm rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-violet-400 mb-1.5 block">Nom d'utilisateur</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-300 text-sm">@</span>
                <input className="input-field pl-8" placeholder="tonnom"
                  value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
              </div>
              <p className="text-xs text-violet-300 mt-1">linkdrop.app/{form.username || 'tonnom'}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-violet-400 mb-1.5 block">Email</label>
              <input className="input-field" type="email" placeholder="ton@email.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
              <label className="text-xs font-medium text-violet-400 mb-1.5 block">Mot de passe</label>
              <input className="input-field" type="password" placeholder="8 caractères minimum"
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required minLength={8} />
            </div>
            <button className="btn-primary mt-2" disabled={loading}>
              {loading ? 'Création...' : 'Créer mon compte gratuitement'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-violet-400 mt-4">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-violet-600 font-medium hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}