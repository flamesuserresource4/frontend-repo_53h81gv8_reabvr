import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Spline from '@splinetool/react-spline'
import { api, setToken, getToken, clearToken } from './lib/api'

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const t = getToken()
    if (t) api.me().then(setUser).catch(() => clearToken())
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 w-full z-20 backdrop-blur bg-black/40 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold tracking-wide text-lg">Kick Start Visuals</Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="hover:text-cyan-300">Home</Link>
            <Link to="/services" className="hover:text-cyan-300">Services</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-cyan-300">Dashboard</Link>
                <button onClick={()=>{clearToken(); setUser(null); navigate('/')}} className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20">Logout</button>
              </>
            ) : (
              <Link to="/auth" className="px-3 py-1.5 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-medium">Login</Link>
            )}
          </nav>
          <button className="md:hidden" onClick={()=>setMenuOpen(!menuOpen)}>
            <span className="i">☰</span>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <Link to="/" className="block">Home</Link>
            <Link to="/services" className="block">Services</Link>
            <Link to="/auth" className="block">Login</Link>
          </div>
        )}
      </header>
      <main className="pt-16">{children}</main>
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-white/70 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Kick Start Visuals</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-cyan-300">Instagram</a>
            <a href="#" className="hover:text-cyan-300">Twitter/X</a>
            <a href="#" className="hover:text-cyan-300">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Hero() {
  const navigate = useNavigate()
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/xzUirwcZB9SOxUWt/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex flex-col items-start justify-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Kick Start Visuals
        </h1>
        <p className="mt-3 md:mt-4 text-lg md:text-2xl text-white/80">Where Ideas Take Shape</p>
        <button onClick={()=>navigate('/services#form')} className="mt-8 px-6 py-3 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-semibold shadow-lg shadow-cyan-500/30">Get Started</button>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 pointer-events-none"></div>
    </section>
  )
}

function HomePage() {
  const services = [
    {title:'Website Design', desc:'Modern, responsive websites built for speed and impact.'},
    {title:'Graphic Design', desc:'Brand assets, social graphics, and marketing collateral.'},
    {title:'Video Editing', desc:'Crisp edits, motion graphics, and story-first cuts.'},
    {title:'Branding', desc:'Naming, identity systems, and brand guidelines.'},
  ]
  return (
    <Layout>
      <Hero />
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Built for creators, startups, and ambitious brands.</h2>
            <p className="mt-4 text-white/80">We craft clean, fast, and memorable visuals across web, motion, and identity. Our process is collaborative and outcome-driven.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {services.map((s)=> (
              <div key={s.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-white/70 mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold">What clients say</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {["Super fast and stunning.", "They nailed our brand.", "Best decision we made."].map((t,i)=>(
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-white/80">“{t}”</p>
              <p className="text-white/60 mt-3 text-sm">— Client {i+1}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-400/30 p-8 md:p-12">
          <h3 className="text-2xl font-bold">Let’s build something great</h3>
          <p className="text-white/80 mt-2">Have a project in mind? Reach out or send a request and we’ll get back within 24 hours.</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/services" className="px-5 py-2.5 rounded bg-cyan-500 text-black font-semibold hover:bg-cyan-400">Send a Request</Link>
            <a href="#" className="px-5 py-2.5 rounded border border-white/20 hover:bg-white/10">Contact on Instagram</a>
          </div>
        </div>
      </section>
    </Layout>
  )
}

function ServicesPage() {
  const services = [
    {key:'Website Design', desc:'Design + build responsive websites.'},
    {key:'Graphic Design', desc:'Logos, posters, social, ads.'},
    {key:'Video Editing', desc:'Edits, reels, motion graphics.'},
    {key:'Branding', desc:'Identity systems and guidelines.'},
  ]
  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">Services</h1>
        <div className="mt-6 grid md:grid-cols-4 gap-6">
          {services.map(s => (
            <div key={s.key} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="font-semibold">{s.key}</h3>
              <p className="text-sm text-white/70 mt-2">{s.desc}</p>
              <a href="#form" className="mt-4 inline-block px-3 py-2 bg-cyan-500 text-black rounded hover:bg-cyan-400">Select Service</a>
            </div>
          ))}
        </div>
      </section>
      <ServiceForm />
    </Layout>
  )
}

function ServiceForm() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', selected_service:'Website Design', description:'', budget:'' })
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const t = getToken()
    if (t) api.me().then(setUser).catch(()=>{})
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Require login to submit
      if (!user) {
        navigate('/auth')
        return
      }
      await api.createProject(form)
      navigate('/dashboard')
    } catch (e) {
      alert('Could not submit: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="form" className="max-w-3xl mx-auto px-4 pb-24">
      <h2 className="text-2xl font-bold">Service Request Form</h2>
      <p className="text-white/70 mt-1">We’ll review and confirm within 24 hours.</p>
      <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" className="px-4 py-3 rounded bg-white/5 border border-white/10" />
          <input required type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="px-4 py-3 rounded bg-white/5 border border-white/10" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Phone" className="px-4 py-3 rounded bg-white/5 border border-white/10" />
          <select value={form.selected_service} onChange={e=>setForm({...form, selected_service:e.target.value})} className="px-4 py-3 rounded bg-white/5 border border-white/10">
            {['Website Design','Graphic Design','Video Editing','Branding'].map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <textarea required value={form.description} onChange={e=>setForm({...form, description:e.target.value})} rows={5} placeholder="Project Description" className="px-4 py-3 rounded bg-white/5 border border-white/10"></textarea>
        <input value={form.budget} onChange={e=>setForm({...form, budget:e.target.value})} placeholder="Budget (optional)" className="px-4 py-3 rounded bg-white/5 border border-white/10" />
        <button disabled={loading} className="mt-2 px-5 py-3 rounded bg-cyan-500 text-black font-semibold hover:bg-cyan-400 disabled:opacity-60">{loading ? 'Submitting...' : 'Submit Request'}</button>
      </form>
    </section>
  )
}

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      if (isLogin) {
        const res = await api.login(email, password)
        setToken(res.access_token)
      } else {
        const res = await api.signup({ name, email, password })
        setToken(res.token)
      }
      navigate('/dashboard')
    } catch (e) {
      alert('Auth error: ' + e.message)
    }
  }

  return (
    <Layout>
      <section className="max-w-md mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold">{isLogin ? 'Login' : 'Create Account'}</h1>
        <form onSubmit={submit} className="mt-6 space-y-3">
          {!isLogin && (
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full px-4 py-3 rounded bg-white/5 border border-white/10" />
          )}
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 rounded bg-white/5 border border-white/10" />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 rounded bg-white/5 border border-white/10" />
          <button className="w-full px-5 py-3 rounded bg-cyan-500 text-black font-semibold hover:bg-cyan-400">{isLogin ? 'Login' : 'Sign up'}</button>
          <p className="text-sm text-white/70">{isLogin ? 'No account?' : 'Have an account?'} <button type="button" onClick={()=>setIsLogin(!isLogin)} className="text-cyan-300 hover:underline">{isLogin ? 'Sign up' : 'Login'}</button></p>
        </form>
      </section>
    </Layout>
  )
}

function ProgressBar({ status }) {
  const stages = ['Pending','In Progress','Completed']
  const idx = stages.indexOf(status)
  return (
    <div className="w-full h-2 bg-white/10 rounded overflow-hidden">
      <div className="h-full bg-cyan-400 transition-all" style={{ width: `${(idx+1)/stages.length*100}%` }} />
    </div>
  )
}

function DashboardPage() {
  const [projects, setProjects] = useState([])
  const [fileMap, setFileMap] = useState({})

  useEffect(() => {
    api.myProjects().then(setProjects).catch(()=>{})
  }, [])

  const upload = async (projectId) => {
    const file = fileMap[projectId]
    if (!file) return
    await api.uploadFile(projectId, file)
    alert('Uploaded!')
  }

  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <div className="mt-6 space-y-6">
          {projects.map(p => (
            <div key={p._id} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{p.selected_service}</h3>
                  <p className="text-sm text-white/70 mt-1">{p.description}</p>
                </div>
                <span className="px-3 py-1 rounded bg-white/10 text-sm">{p.status}</span>
              </div>
              <div className="mt-3"><ProgressBar status={p.status} /></div>
              <div className="mt-4 flex items-center gap-3">
                <input type="file" onChange={e=>setFileMap({...fileMap, [p._id]: e.target.files[0]})} className="text-sm" />
                <button onClick={()=>upload(p._id)} className="px-3 py-2 rounded bg-cyan-500 text-black hover:bg-cyan-400">Upload File</button>
                <Link to={`/project/${p._id}`} className="px-3 py-2 rounded border border-white/20 hover:bg-white/10">Open Messages</Link>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-white/70">No projects yet. Submit a request on the Services page.</p>
          )}
        </div>
      </section>
    </Layout>
  )
}

function ProjectChatPage() {
  const projectId = window.location.pathname.split('/').pop()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const load = () => api.getMessages(projectId).then(setMessages)
  useEffect(() => { load() }, [projectId])

  const send = async () => {
    if (!input) return
    await api.sendMessage(projectId, input)
    setInput('')
    load()
  }

  return (
    <Layout>
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Project Messages</h1>
        <div className="mt-4 space-y-3">
          {messages.map(m => (
            <div key={m._id} className="rounded border border-white/10 p-3 bg-white/5">
              <div className="text-xs text-white/60">{m.sender_role}</div>
              <div>{m.content}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a message" className="flex-1 px-3 py-2 rounded bg-white/5 border border-white/10" />
          <button onClick={send} className="px-4 py-2 rounded bg-cyan-500 text-black">Send</button>
        </div>
      </section>
    </Layout>
  )
}

function AdminPage() {
  const [filters, setFilters] = useState({ service:'', status:'' })
  const [items, setItems] = useState([])

  const load = () => api.adminList({ service: filters.service || undefined, status: filters.status || undefined }).then(setItems)
  useEffect(() => { load() }, [])

  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="mt-4 grid md:grid-cols-4 gap-3">
          <select value={filters.service} onChange={e=>setFilters({...filters, service:e.target.value})} className="px-3 py-2 rounded bg-white/5 border border-white/10">
            <option value="">All Services</option>
            {['Website Design','Graphic Design','Video Editing','Branding'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={filters.status} onChange={e=>setFilters({...filters, status:e.target.value})} className="px-3 py-2 rounded bg-white/5 border border-white/10">
            <option value="">All Status</option>
            {['Pending','In Progress','Completed'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={load} className="px-4 py-2 rounded bg-white/10 hover:bg-white/20">Apply Filters</button>
        </div>
        <div className="mt-6 space-y-6">
          {items.map(p => (
            <div key={p._id} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{p.selected_service} — <span className="text-white/60 text-sm">{p.email}</span></h3>
                  <p className="text-sm text-white/70 mt-1">{p.description}</p>
                </div>
                <span className="px-3 py-1 rounded bg-white/10 text-sm">{p.status}</span>
              </div>
              <div className="mt-3 grid md:grid-cols-2 gap-3">
                <select defaultValue={p.status} onChange={e=>api.adminUpdateStatus(p._id, { status:e.target.value }).then(load)} className="px-3 py-2 rounded bg-white/5 border border-white/10">
                  {['Pending','In Progress','Completed'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <Link to={`/project/${p._id}`} className="px-3 py-2 rounded bg-cyan-500 text-black hover:bg-cyan-400 text-center">Open Messages</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/project/:id" element={<ProjectChatPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
