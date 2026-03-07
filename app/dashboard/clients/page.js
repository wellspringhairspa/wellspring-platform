'use client'

import { useState, useEffect } from 'react'

export default function Clients() {
  const [clients, setClients] = useState([])
  const [newCode, setNewCode] = useState('')
  const [newNotes, setNewNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

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
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    const { data, error } = await supabase
      .from('clients')
      .insert([{ client_code: newCode, practitioner_id: user.id, notes: newNotes, visit_count: 0 }])
      .select()
    if (!error) {
      setClients([data[0], ...clients])
      setNewCode('')
      setNewNotes('')
    }
  }

  if (loading) return <div style={{minHeight:'100vh', backgroundColor:'#FAF7F2', display:'flex', alignItems:'center', justifyContent:'center'}}>Loading...</div>

  return (
    <div style={{minHeight:'100vh', backgroundColor:'#FAF7F2', fontFamily:'Georgia, serif'}}>
      <nav style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'24px 48px', backgroundColor:'white', borderBottom:'1px solid rgba(122,139,111,0.15)'}}>
        <div style={{fontSize:'1.3rem', color:'#7A8B6F'}}>Wellspring by Molly Gee</div>
        <a href="/dashboard" style={{textDecoration:'none', color:'#7A8B6F', fontSize:'0.9rem'}}>← Back to Dashboard</a>
      </nav>

      <div style={{maxWidth:'800px', margin:'0 auto', padding:'48px 24px'}}>
        <p style={{fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#C4956A', marginBottom:'8px'}}>Client Management</p>
        <h1 style={{fontSize:'2rem', color:'#3D3530', marginBottom:'32px'}}>My Clients</h1>

        <div style={{backgroundColor:'white', padding:'32px', borderRadius:'8px', border:'1px solid rgba(122,139,111,0.15)', marginBottom:'32px'}}>
          <h3 style={{fontSize:'1.1rem', color:'#3D3530', marginBottom:'20px'}}>Add New Client</h3>
          <input
            placeholder="Client code (e.g. MGW001)"
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            style={{width:'100%', padding:'12px', border:'1px solid rgba(122,139,111,0.3)', borderRadius:'4px', marginBottom:'12px', fontSize:'0.95rem', fontFamily:'Georgia, serif'}}
          />
          <input
            placeholder="Notes (optional)"
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
            style={{width:'100%', padding:'12px', border:'1px solid rgba(122,139,111,0.3)', borderRadius:'4px', marginBottom:'16px', fontSize:'0.95rem', fontFamily:'Georgia, serif'}}
          />
          <button onClick={addClient} style={{backgroundColor:'#7A8B6F', color:'white', border:'none', padding:'12px 32px', borderRadius:'4px', fontSize:'0.95rem', cursor:'pointer'}}>
            Add Client
          </button>
        </div>

        <div>
          {clients.length === 0 ? (
            <p style={{textAlign:'center', color:'#B0A89E', padding:'48px'}}>No clients yet — add your first one above!</p>
          ) : (
            clients.map((client) => (
              <div key={client.id} style={{backgroundColor:'white', padding:'24px 32px', borderRadius:'8px', border:'1px solid rgba(122,139,111,0.15)', marginBottom:'12px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <p style={{fontSize:'1.1rem', color:'#3D3530', marginBottom:'4px'}}>{client.client_code}</p>
                  <p style={{fontSize:'0.85rem', color:'#B0A89E'}}>{client.notes || 'No notes'} · {client.visit_count} visits</p>
                </div>
                <a href={`/dashboard/clients/${client.id}`} style={{textDecoration:'none', backgroundColor:'#7A8B6F', color:'white', padding:'8px 20px', borderRadius:'4px', fontSize:'0.85rem'}}>
                  View →
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}