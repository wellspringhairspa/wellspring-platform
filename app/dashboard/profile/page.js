'use client'

import { useState, useEffect } from 'react'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [profile, setProfile] = useState({
    services_offered: '',
    retail_products: '',
    ohs_affiliate_link: '',
    equilife_affiliate_link: '',
    olive_tree_affiliate_link: '',
    frequense_affiliate_link: '',
    monat_affiliate_link: '',
    lifevantage_affiliate_link: '',
    fullscript_link: '',
    additional_supplements: ''
  })

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
        .from('practitioner_profiles')
        .select('*')
        .eq('practitioner_id', user.id)
        .single()
      if (data) setProfile(data)
    }
    init()
  }, [])

  const saveProfile = async () => {
    setSaving(true)
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    const { error } = await supabase
      .from('practitioner_profiles')
      .upsert({ ...profile, practitioner_id: user.id })
    if (error) {
      setMessage('Error saving. Please try again.')
    } else {
      setMessage('Profile saved successfully!')
    }
    setSaving(false)
  }

  const inputStyle = {width:'100%', padding:'10px 12px', border:'1px solid rgba(122,139,111,0.3)', borderRadius:'4px', fontSize:'0.9rem', fontFamily:'Georgia, serif', marginBottom:'12px', backgroundColor:'#FDFCFA'}
  const textareaStyle = {...inputStyle, minHeight:'100px', resize:'vertical'}
  const sectionStyle = {backgroundColor:'white', padding:'32px', borderRadius:'8px', border:'1px solid rgba(122,139,111,0.15)', marginBottom:'24px'}
  const labelStyle = {display:'block', fontSize:'0.8rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'#7A8B6F', marginBottom:'6px'}

  return (
    <div style={{minHeight:'100vh', backgroundColor:'#FAF7F2', fontFamily:'Georgia, serif'}}>
      <nav style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'24px 48px', backgroundColor:'white', borderBottom:'1px solid rgba(122,139,111,0.15)'}}>
        <div style={{fontSize:'1.3rem', color:'#7A8B6F'}}>Wellspring by Molly Gee</div>
        <a href="/dashboard" style={{textDecoration:'none', color:'#7A8B6F', fontSize:'0.9rem'}}>← Back to Dashboard</a>
      </nav>

      <div style={{maxWidth:'800px', margin:'0 auto', padding:'48px 24px'}}>
        <p style={{fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#C4956A', marginBottom:'8px'}}>Account Setup</p>
        <h1 style={{fontSize:'2rem', color:'#3D3530', marginBottom:'8px'}}>Practitioner Profile</h1>
        <p style={{color:'#B0A89E', marginBottom:'40px', fontSize:'0.9rem'}}>This information helps personalize the reports you generate for your clients.</p>

        <div style={sectionStyle}>
          <h2 style={{fontSize:'1.1rem', color:'#3D3530', marginBottom:'20px'}}>Your Practice</h2>
          <label style={labelStyle}>Services You Offer</label>
          <textarea
            value={profile.services_offered}
            onChange={e => setProfile({...profile, services_offered: e.target.value})}
            style={textareaStyle}
            placeholder="e.g. Headspa scalp facials, trichology consultations, epigenetic hair scanning, laser therapy..."
          />
          <label style={labelStyle}>Retail Products You Carry</label>
          <textarea
            value={profile.retail_products}
            onChange={e => setProfile({...profile, retail_products: e.target.value})}
            style={textareaStyle}
            placeholder="e.g. LockRX, Arete, Keravive spray..."
          />
        </div>

        <div style={sectionStyle}>
          <h2 style={{fontSize:'1.1rem', color:'#3D3530', marginBottom:'8px'}}>Supplement Affiliate Links</h2>
          <p style={{fontSize:'0.85rem', color:'#B0A89E', marginBottom:'20px'}}>All fields are optional. Add your affiliate links so supplement recommendations in reports link directly to your account.</p>

          {[
            ['ohs_affiliate_link', 'OHS (Optimal Health Systems)', 'Your OHS affiliate link', null],
            ['equilife_affiliate_link', 'EquiLife', 'Your EquiLife affiliate link', null],
            ['olive_tree_affiliate_link', 'Olive Tree People', 'Your Olive Tree People affiliate link', 'https://www.olivetreepeople.com — register under Molly Gee'],
            ['frequense_affiliate_link', 'Frequense', 'Your Frequense affiliate link', 'Register under Molly Gee at frequense.com'],
            ['monat_affiliate_link', 'Monat', 'Your Monat affiliate link', 'Register under Molly Gee at monat.com'],
            ['lifevantage_affiliate_link', 'LifeVantage', 'Your LifeVantage affiliate link', 'Register under Molly Gee at lifevantage.com'],
            ['fullscript_link', 'Fullscript', 'Your Fullscript dispensary link', null],
          ].map(([key, label, placeholder, hint]) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              {hint && <p style={{fontSize:'0.8rem', color:'#C4956A', marginBottom:'6px'}}>💡 {hint}</p>}
              <input
                type="url"
                value={profile[key]}
                onChange={e => setProfile({...profile, [key]: e.target.value})}
                style={inputStyle}
                placeholder={placeholder}
              />
            </div>
          ))}

          <label style={labelStyle}>Additional Supplement Brands You Recommend</label>
          <textarea
            value={profile.additional_supplements}
            onChange={e => setProfile({...profile, additional_supplements: e.target.value})}
            style={textareaStyle}
            placeholder="List any other supplement brands or products you recommend to clients..."
          />
        </div>

        {message && <p style={{textAlign:'center', color:'#7A8B6F', marginBottom:'16px'}}>{message}</p>}

        <button onClick={saveProfile} disabled={saving} style={{width:'100%', padding:'16px', backgroundColor:'#7A8B6F', color:'white', border:'none', borderRadius:'4px', fontSize:'1rem', cursor:'pointer'}}>
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </div>
  )
}