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

      const { data: reportsData } = await supabase
        .from('reports')
        .select('*')
        .eq('client_id', params.id)
        .order('visit_date', { ascending: false })

      setClient(clientData)
      setReports(reportsData || [])
      setLoading(false)
    }
    init()
  }, [params.id])

  if (loading) return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia, serif', color: '#7A8B6F' }}>
      Loading...
    </div>
  )

  if (!client) return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia, serif', color: '#C4956A' }}>
      Client not found.
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2', fontFamily: 'Georgia, serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', backgroundColor: 'white', borderBottom: '1px solid rgba(122,139,111,0.15)' }}>
        <div style={{ fontSize: '1.3rem', color: '#7A8B6F' }}>Wellspring by Molly Gee</div>
        <a href="/dashboard/clients" style={{ textDecoration: 'none', color: '#7A8B6F', fontSize: '0.9rem' }}>← Back to Clients</a>
      </nav>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px' }}>

        {/* Client Header */}
        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', border: '1px solid rgba(122,139,111,0.15)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <p style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4956A', marginBottom: '8px' }}>Client Profile</p>
              <h1 style={{ fontSize: '2rem', color: '#3D3530', marginBottom: '8px' }}>
                {client.client_code || 'Client'}
              </h1>
              <p style={{ color: '#B0A89E', fontSize: '0.9rem' }}>
                {reports.length} visit{reports.length !== 1 ? 's' : ''} on record
              </p>
              {client.notes && (
                <p style={{ color: '#7A8B6F', fontSize: '0.9rem', marginTop: '12px', fontStyle: 'italic' }}>
                  {client.notes}
                </p>
              )}
            </div>
            <a
              href={`/dashboard/clients/${params.id}/new-report`}
              style={{ padding: '12px 24px', backgroundColor: '#7A8B6F', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '0.9rem', whiteSpace: 'nowrap' }}
            >
              + New Report
            </a>
          </div>
        </div>

        {/* Reports List */}
        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', border: '1px solid rgba(122,139,111,0.15)' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#3D3530', marginBottom: '20px' }}>Visit History</h2>

          {reports.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#B0A89E' }}>
              <p style={{ marginBottom: '16px' }}>No reports yet — create the first one!</p>
              <a
                href={`/dashboard/clients/${params.id}/new-report`}
                style={{ padding: '12px 24px', backgroundColor: '#C4956A', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '0.9rem' }}
              >
                + New Report
              </a>
            </div>
          ) : (
            <div>
              {reports.map((report) => {
                const rd = report.report_data || {}
                const intake = rd.intake || {}
                const scan = rd.scan || {}
                return (
                  <a
                    key={report.id}
                    href={`/dashboard/clients/${params.id}/reports/${report.id}`}
                    style={{ display: 'block', textDecoration: 'none', padding: '20px', border: '1px solid rgba(122,139,111,0.2)', borderRadius: '6px', marginBottom: '12px', transition: 'border-color 0.2s', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#C4956A'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(122,139,111,0.2)'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <p style={{ fontSize: '1rem', color: '#3D3530', marginBottom: '4px', fontWeight: 'bold' }}>
                          {report.visit_date
                            ? new Date(report.visit_date + 'T12:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                            : 'Visit'}
                        </p>
                        {intake.primary_concern && (
                          <p style={{ fontSize: '0.85rem', color: '#7A8B6F', marginBottom: '4px' }}>
                            {intake.primary_concern}
                          </p>
                        )}
                        {scan.report_type && (
                          <p style={{ fontSize: '0.8rem', color: '#B0A89E' }}>{scan.report_type}</p>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {report.ai_report && (
                          <span style={{ fontSize: '0.75rem', padding: '3px 10px', backgroundColor: 'rgba(122,139,111,0.1)', color: '#7A8B6F', borderRadius: '20px' }}>
                            ✓ Report generated
                          </span>
                        )}
                        <span style={{ color: '#C4956A', fontSize: '0.85rem' }}>View →</span>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}