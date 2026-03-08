'use client'

import { useState, useEffect } from 'react'

export default function Clients() {
  const [clients, setClients] = useState([])
  const [newCode, setNewCode] = useState('')
  const [newNotes, setNewNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [adding, setAdding] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const init = async () => {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }
      setUser(user)

      const { data } = await supabase
        .from('clients')
        .select('*')
        .eq('practitioner_id', user.id)
        .order('created_at', { ascending: false })

      setClients(data || [])
      setLoading(false)
    }
    init()
  }, [])

  const addClient = async () => {
    if (!newCode.trim()) return
    setAdding(true)
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    const { data, error } = await supabase
      .from('clients')
      .insert([{ client_code: newCode.trim(), notes: newNotes.trim(), practitioner_id: user.id }])
      .select()

    if (!error && data) {
      setClients([data[0], ...clients])
      setNewCode('')
      setNewNotes('')
      setShowForm(false)
    }
    setAdding(false)
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia, serif', color: '#7A8B6F' }}>
      Loading...
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2', fontFamily: 'Georgia, serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', backgroundColor: 'white', borderBottom: '1px solid rgba(122,139,111,0.15)' }}>
        <div style={{ fontSize: '1.3rem', color: '#7A8B6F' }}>Wellspring by Molly Gee</div>
        <a href="/dashboard" style={{ textDecoration: 'none', color: '#7A8B6F', fontSize: '0.9rem' }}>← Back to Dashboard</a>
      </nav>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4956A', marginBottom: '8px' }}>Your Practice</p>
            <h1 style={{ fontSize: '2rem', color: '#3D3530' }}>Clients</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{ padding: '12px 24px', backgroundColor: '#7A8B6F', color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.9rem', cursor: 'pointer' }}
          >
            + Add Client
          </button>
        </div>

        {showForm && (
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', border: '1px solid rgba(122,139,111,0.15)', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1rem', color: '#3D3530', marginBottom: '16px' }}>New Client</h2>
            <input
              value={newCode}
              onChange={e => setNewCode(e.target.value)}
              placeholder="Client code or name (e.g. Jane D.)"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid rgba(122,139,111,0.3)', borderRadius: '4px', fontSize: '0.9rem', fontFamily: 'Georgia, serif', marginBottom: '12px', backgroundColor: '#FDFCFA', boxSizing: 'border-box' }}
            />
            <input
              value={newNotes}
              onChange={e => setNewNotes(e.target.value)}
              placeholder="Notes (optional)"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid rgba(122,139,111,0.3)', borderRadius: '4px', fontSize: '0.9rem', fontFamily: 'Georgia, serif', marginBottom: '16px', backgroundColor: '#FDFCFA', boxSizing: 'border-box' }}
            />
            <button
              onClick={addClient}
              disabled={adding}
              style={{ padding: '10px 24px', backgroundColor: '#C4956A', color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.9rem', cursor: adding ? 'not-allowed' : 'pointer', opacity: adding ? 0.7 : 1 }}
            >
              {adding ? 'Adding...' : 'Add Client'}
            </button>
          </div>
        )}

        <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid rgba(122,139,111,0.15)' }}>
          {clients.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center', color: '#B0A89E' }}>
              No clients yet — add your first one!
            </div>
          ) : (
            clients.map((client, i) => (
              <a
                key={client.id}
                href={`/dashboard/clients/${client.id}`}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '20px 24px', textDecoration: 'none',
                  borderBottom: i < clients.length - 1 ? '1px solid rgba(122,139,111,0.1)' : 'none',
                  transition: 'background-color 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FAF7F2'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
              >
                <div>
                  <p style={{ color: '#3D3530', fontSize: '1rem', marginBottom: '4px' }}>{client.client_code}</p>
                  {client.notes && <p style={{ color: '#B0A89E', fontSize: '0.85rem' }}>{client.notes}</p>}
                </div>
                <span style={{ color: '#C4956A', fontSize: '0.85rem' }}>View →</span>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  )
}