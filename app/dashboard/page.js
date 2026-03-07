'use client'

import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) window.location.href = '/login'
      else setUser(user)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (!user) return <div style={{minHeight:'100vh', backgroundColor:'#FAF7F2', display:'flex', alignItems:'center', justifyContent:'center'}}>Loading...</div>

  return (
    <div style={{minHeight:'100vh', backgroundColor:'#FAF7F2', fontFamily:'Georgia, serif'}}>
      <nav style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'24px 48px', backgroundColor:'white', borderBottom:'1px solid rgba(122,139,111,0.15)'}}>
        <div style={{fontSize:'1.3rem', color:'#7A8B6F'}}>Wellspring by Molly Gee</div>
        <button onClick={handleLogout} style={{backgroundColor:'transparent', color:'#7A8B6F', border:'1.5px solid #7A8B6F', padding:'8px 24px', borderRadius:'4px', cursor:'pointer', fontSize:'0.9rem'}}>
          Log Out
        </button>
      </nav>

      <div style={{maxWidth:'1000px', margin:'0 auto', padding:'48px 24px'}}>
        <p style={{fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#C4956A', marginBottom:'8px'}}>Welcome back</p>
        <h1 style={{fontSize:'2rem', color:'#3D3530', marginBottom:'8px'}}>{user.email}</h1>
        <p style={{color:'#B0A89E', marginBottom:'48px', fontSize:'0.9rem'}}>Practitioner Dashboard</p>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'24px'}}>
          <div style={{backgroundColor:'white', padding:'32px', borderRadius:'8px', border:'1px solid rgba(122,139,111,0.15)'}}>
            <div style={{fontSize:'1.5rem', marginBottom:'12px'}}>📋</div>
            <h3 style={{fontSize:'1.1rem', color:'#3D3530', marginBottom:'8px'}}>Root Cause Report Builder</h3>
            <p style={{fontSize:'0.9rem', color:'#7A7068', marginBottom:'20px', lineHeight:1.6}}>Build comprehensive hair loss reports from epigenetic scan data.</p>
            <a href="/dashboard/clients" style={{textDecoration:'none', display:'inline-block', backgroundColor:'#7A8B6F', color:'white', padding:'10px 24px', borderRadius:'4px', fontSize:'0.9rem'}}>
              View Clients →
            </a>
          </div>

          <div style={{backgroundColor:'white', padding:'32px', borderRadius:'8px', border:'1px solid rgba(122,139,111,0.15)'}}>
            <div style={{fontSize:'1.5rem', marginBottom:'12px'}}>👤</div>
            <h3 style={{fontSize:'1.1rem', color:'#3D3530', marginBottom:'8px'}}>My Clients</h3>
            <p style={{fontSize:'0.9rem', color:'#7A7068', marginBottom:'20px', lineHeight:1.6}}>View and manage your client profiles and scan history.</p>
            <a href="/dashboard/clients" style={{textDecoration:'none', display:'inline-block', backgroundColor:'#7A8B6F', color:'white', padding:'10px 24px', borderRadius:'4px', fontSize:'0.9rem'}}>
              View Clients →
            </a>
          </div>

          <div style={{backgroundColor:'white', padding:'32px', borderRadius:'8px', border:'1px solid rgba(122,139,111,0.15)'}}>
            <div style={{fontSize:'1.5rem', marginBottom:'12px'}}>🌿</div>
            <h3 style={{fontSize:'1.1rem', color:'#3D3530', marginBottom:'8px'}}>My Profile</h3>
            <p style={{fontSize:'0.9rem', color:'#7A7068', marginBottom:'20px', lineHeight:1.6}}>Manage your services, retail products, and supplement affiliate links.</p>
            <a href="/dashboard/profile" style={{textDecoration:'none', display:'inline-block', backgroundColor:'#7A8B6F', color:'white', padding:'10px 24px', borderRadius:'4px', fontSize:'0.9rem'}}>
              My Profile →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}