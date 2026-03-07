'use client'

import { useState, useEffect } from 'react'

export default function NewReport({ params }) {
  const [user, setUser] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const [intake, setIntake] = useState({
    primary_concern: '',
    hair_pattern: '',
    onset: '',
    medical_history: '',
    medications: '',
    supplements: '',
    hormonal_notes: '',
    gut_symptoms: '',
    stress_level: '',
    diet_notes: '',
    recent_events: ''
  })

  const [scan, setScan] = useState({
    report_type: 'Immunity & Wellbeing',
    total_immune_value: '',
    gut_support_value: '',
    flagged_systems: '',
    priority_nutrients: '',
    advisory_nutrients: '',
    force_multipliers: '',
    foods_to_avoid: '',
    base_scenario: ''
  })

  const [protocol, setProtocol] = useState({
    supplements: '',
    foods: '',
    lifestyle: '',
    further_testing: '',
    topical_home: '',
    in_clinic: '',
    notes: ''
  })

  const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0])

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
    }
    init()
  }, [])

  const saveReport = async () => {
    setSaving(true)
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    const { error } = await supabase.from('reports').insert([{
      client_id: params.id,
      practitioner_id: user.id,
      visit_date: visitDate,
      report_data: { intake, scan, protocol },
      notes: intake.primary_concern
    }])
    if (error) {
      setMessage('Error saving report. Please try again.')
    } else {
      window.location.href = `/dashboard/clients/${params.id}`
    }
    setSaving(false)
  }

  const inputStyle = {width:'100%', padding:'10px 12px', border:'1px solid rgba(122,139,111,0.3)', borderRadius:'4px', fontSize:'0.9rem', fontFamily:'Georgia, serif', marginBottom:'12px', backgroundColor:'#FDFCFA'}
  const textareaStyle = {...inputStyle, minHeight:'80px', resize:'vertical'}
  const sectionStyle = {backgroundColor:'white', padding:'32px', borderRadius:'8px', border:'1px solid rgba(122,139,111,0.15)', marginBottom:'24px'}
  const labelStyle = {display:'block', fontSize:'0.8rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'#7A8B6F', marginBottom:'6px', fontFamily:'Georgia, serif'}

  return (
    <div style={{minHeight:'100vh', backgroundColor:'#FAF7F2', fontFamily:'Georgia, serif'}}>
      <nav style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'24px 48px', backgroundColor:'white', borderBottom:'1px solid rgba(122,139,111,0.15)'}}>
        <div style={{fontSize:'1.3rem', color:'#7A8B6F'}}>Wellspring by Molly Gee</div>
        <a href={`/dashboard/clients/${params.id}`} style={{textDecoration:'none', color:'#7A8B6F', fontSize:'0.9rem'}}>← Back to Client</a>
      </nav>

      <div style={{maxWidth:'800px', margin:'0 auto', padding:'48px 24px'}}>
        <p style={{fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#C4956A', marginBottom:'8px'}}>New Visit Report</p>
        <h1 style={{fontSize:'2rem', color:'#3D3530', marginBottom:'32px'}}>Enter Visit Data</h1>

        <div style={sectionStyle}>
          <h2 style={{fontSize:'1.1rem', color:'#3D3530', marginBottom:'20px'}}>Visit Date</h2>
          <input type="date" value={visitDate} onChange={e => setVisitDate(e.target.value)} style={inputStyle} />
        </div>

        <div style={sectionStyle}>
          <h2 style={{fontSize:'1.1rem', color:'#3D3530', marginBottom:'20px'}}>Client Intake</h2>
          {[
            ['primary_concern', 'Primary Concern'],
            ['hair_pattern', 'Hair Loss Pattern & Location'],
            ['onset', 'When Did It Start / Timeline'],
            ['medical_history', 'Medical History'],
            ['medications', 'Current Medications'],
            ['supplements', 'Current Supplements'],
            ['hormonal_notes', 'Hormonal History'],
            ['gut_symptoms', 'Gut / Digestive Symptoms'],
            ['stress_level', 'Stress Level & Sources'],
            ['diet_notes', 'Diet Notes'],
            ['recent_events', 'Recent Events / Life Changes']
          ].map(([key, label]) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <textarea
                value={intake[key]}
                onChange={e => setIntake({...intake, [key]: e.target.value})}
                style={textareaStyle}
                placeholder={label}
              />
            </div>
          ))}
        </div>

        <div style={sectionStyle}>
          <h2 style={{fontSize:'1.1rem', color:'#3D3530', marginBottom:'20px'}}>CWB Scan Data</h2>
          <label style={labelStyle}>Report Type</label>
          <select value={scan.report_type} onChange={e => setScan({...scan, report_type: e.target.value})} style={inputStyle}>
            <option>Immunity & Wellbeing</option>
            <option>Hair, Skin & Nails</option>
          </select>
          {[
            ['total_immune_value', 'Total Immune Value'],
            ['gut_support_value', 'Gut Support Value'],
            ['flagged_systems', 'Flagged Systems (Priority & Advisory)'],
            ['priority_nutrients', 'Priority Nutrients'],
            ['advisory_nutrients', 'Advisory Nutrients'],
            ['force_multipliers', 'Force Multipliers (Pathogens, Exposures, Food Sensitivities)'],
            ['foods_to_avoid', 'Foods to Avoid'],
            ['base_scenario', 'Root Cause Base Scenario']
          ].map(([key, label]) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <textarea
                value={scan[key]}
                onChange={e => setScan({...scan, [key]: e.target.value})}
                style={textareaStyle}
                placeholder={label}
              />
            </div>
          ))}
        </div>

        <div style={sectionStyle}>
          <h2 style={{fontSize:'1.1rem', color:'#3D3530', marginBottom:'20px'}}>Protocol</h2>
          {[
            ['supplements', 'Supplement Recommendations'],
            ['foods', 'Food Protocol'],
            ['lifestyle', 'Lifestyle Recommendations'],
            ['further_testing', 'Further Testing Recommended'],
            ['topical_home', 'At-Home Topical Care'],
            ['in_clinic', 'In-Clinic Treatments'],
            ['notes', 'Additional Notes']
          ].map(([key, label]) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <textarea
                value={protocol[key]}
                onChange={e => setProtocol({...protocol, [key]: e.target.value})}
                style={textareaStyle}
                placeholder={label}
              />
            </div>
          ))}
        </div>

        {message && <p style={{color:'#C4956A', marginBottom:'16px', textAlign:'center'}}>{message}</p>}

        <button onClick={saveReport} disabled={saving} style={{width:'100%', padding:'16px', backgroundColor:'#7A8B6F', color:'white', border:'none', borderRadius:'4px', fontSize:'1rem', cursor:'pointer'}}>
          {saving ? 'Saving...' : 'Save Report'}
        </button>
      </div>
    </div>
  )
}