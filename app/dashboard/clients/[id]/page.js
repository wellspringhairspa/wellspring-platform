'use client'

import { useState, useEffect } from 'react'

export default function ClientProfile({ params }) {
  const [client, setClient] = useState(null)
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }

      const { data: clientData } = await supabase
        .from('clients')
        .select('*')
        .eq('id', params.id)
        .single()
      setClient(clientData)

      const { data: reportData } = await supabase
        .from('reports')
        .select('*')
        .eq('client_id', params.id)
        .order('visit_date', { ascending: false })
      setReports(reportData || [])
      setLoading(false)
    }
    init()
  }, [])

  if (loading) return <div style={{minHeight:'100vh', backgroundColor:'#FAF7F2', display:'flex', alignItems:'center', justifyContent:'center'}}>Loading...</div>
  if (!client) return <div style={{minHeight:'100vh', backgroundColor:'#FAF7F2', display:'flex', alignItems:'center', justifyContent:'center'}}>Client not found</div>

  return (
    <div style={{minHeight:'100vh', backgroundColor:'#FAF7F2', fontFamily:'Georgia, serif'}}>
      <nav style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'24px 48px', backgroundColor:'white', borderBottom:'1px solid rgba(122,139,111,0.15)'}}>
        <div style={{fontSize:'1.3rem', color:'#7A8B6F'}}>Wellspring by Molly Gee</div>
        <a href="/dashboard/clients" style={{textDecoration:'none', color:'#7A8B6F', fontSize:'0.9rem'}}>← Back to Clients</a>
      </nav>

      <div style={{maxWidth:'800px', margin:'0 auto', padding:'48px 24px'}}>
        <p style={{fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#C4956A', marginBottom:'8px'}}>Client Profile</p>
        <h1 style={{fontSize:'2rem', color:'#3D3530', marginBottom:'8px'}}>{client.client_code}</h1>
        <p style={{color:'#B0A89E', marginBottom:'8px', fontSize:'0.9rem'}}>{client.notes || 'No notes'}</p>
        <p style={{color:'#B0A89E', marginBottom:'40px', fontSize:'0.9rem'}}>{client.visit_count} visits</p>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
          <h2 style={{fontSize:'1.3rem', color:'#3D3530'}}>Visit History</h2>
          <a href={`/dashboard/clients/${client.id}/new-report`} style={{textDecoration:'none', backgroundColor:'#7A8B6F', color:'white', padding:'10px 24px', borderRadius:'4px', fontSize:'0.9rem'}}>
            + New Report
          </a>
        </div>

        {reports.length === 0 ? (
          <div style={{backgroundColor:'white', padding:'48px', borderRadius:'8px', border:'1px solid rgba(122,139,111,0.15)', textAlign:'center'}}>
            <p style={{color:'#B0A89E'}}>No reports yet — create the first one!</p>
          </div>
        ) : (
          reports.map((report) => (
            <div key={report.id} style={{backgroundColor:'white', padding:'24px 32px', borderRadius:'8px', border:'1px solid rgba(122,139,111,0.15)', marginBottom:'12px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <p style={{fontSize:'1rem', color:'#3D3530', marginBottom:'4px'}}>Visit — {report.visit_date}</p>
                <p style={{fontSize:'0.85rem', color:'#B0A89E'}}>{report.notes || 'No notes'}</p>
              </div>
              <a href={`/dashboard/clients/${client.id}/reports/${report.id}`} style={{textDecoration:'none', backgroundColor:'#7A8B6F', color:'white', padding:'8px 20px', borderRadius:'4px', fontSize:'0.85rem'}}>
                View →
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  )
}