'use client'

import { useState, useEffect } from 'react'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [profile, setProfile] = useState({
    services_offered: '',
    ohs_affiliate_link: '',
    equilife_affiliate_link: '',
    olive_tree_affiliate_link: '',
    frequense_affiliate_link: '',
    monat_affiliate_link: '',
    lifevantage_affiliate_link: '',
    fullscript_link: '',
  })
  const [retailLinks, setRetailLinks] = useState([{ name: '', link: '' }])
  const [additionalSupplements, setAdditionalSupplements] = useState([{ name: '', link: '' }])

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
      if (data) {
        setProfile({
          services_offered: data.services_offered || '',
          ohs_affiliate_link: data.ohs_affiliate_link || '',
          equilife_affiliate_link: data.equilife_affiliate_link || '',
          olive_tree_affiliate_link: data.olive_tree_affiliate_link || '',
          frequense_affiliate_link: data.frequense_affiliate_link || '',
          monat_affiliate_link: data.monat_affiliate_link || '',
          lifevantage_affiliate_link: data.lifevantage_affiliate_link || '',
          fullscript_link: data.fullscript_link || '',
        })
        if (data.retail_links) setRetailLinks(data.retail_links)
        if (data.additional_supplement_links) setAdditionalSupplements(data.additional_supplement_links)
      }
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
      .upsert({
        ...profile,
        practitioner_id: user.id,
        retail_links: retailLinks,
        additional_supplement_links: additionalSupplements
      })
    if (error) {
      setMessage('Error saving. Please try again.')
    } else {
      setMessage('Profile saved successfully!')
    }
    setSaving(false)
  }

  const updateRow = (arr, setArr, index, field, value) => {
    const updated = [...arr]
    updated[index][field] = value
    setArr(updated)
  }

  const addRow = (arr, setArr) => setArr([...arr, { name: '', link: '' }])
  const removeRow = (arr, setArr, index) => setArr(arr.filter((_, i) => i !== index))

  const inputStyle = {padding:'10px 12px', border:'1px solid rgba(122,139,111,0.3)', borderRadius:'4px', fontSize:'0.9rem', fontFamily:'Georgia, serif', backgroundColor:'#FDFCFA'}
  const textareaStyle = {...inputStyle, width:'100%', minHeight:'100px', resize:'vertical', marginBottom:'12px', display:'block'}
  const sectionStyle = {backgroundColor:'white', padding:'32px', borderRadius:'8px', border:'1px solid rgba(122,139,111,0.15)', marginBottom:'24px'}
  const labelStyle = {display:'block', fontSize:'0.8rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'#7A8B6F', marginBottom:'6px'}

  const DynamicRows = ({ arr, setArr, namePlaceholder, linkPlaceholder }) => (
    <div>
      {arr.map((row, i) => (
        <div key={i} style={{display:'grid', gridTemplateColumns:'1fr 1fr auto', gap:'8px', marginBottom:'8px', alignItems:'center'}}>
          <input
            value={row.name}
            onChange={e => updateRow(arr, setArr, i, 'name', e.target.value)}
            placeholder={namePlaceholder}
            style={inputStyle}
          />
          <input
            value={row.link}
            onChange={e => updateRow(arr, setArr, i, 'link', e.target.value)}
            placeholder={linkPlaceholder}
            style={inputStyle}
          />
          <button onClick={() => removeRow(arr, setArr, i)} style={{padding:'10px 14px', backgroundColor:'transparent', border:'1px solid rgba(196,149,106,0.4)', borderRadius:'4px', color:'#C4956A', cursor:'pointer', fontSize:'0.85rem'}}>
            ✕
          </button>
        </div>
      ))}
      <button onClick={() => addRow(arr, setArr)} style={{marginTop:'8px', padding:'8px 20px', backgroundColor:'transparent', border:'1.5px solid #7A8B6F', borderRadius:'4px', color:'#7A8B6F', cursor:'pointer', fontSize:'0.85rem'}}>
        + Add Row
      </button>
    </div>
  )

  return (
    <div style={{minHeight:'100vh', backgroundColor:'#FAF7F2', fontFamily:'Georgia, serif'}}>
      <nav style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'24px 48px', backgroundColor:'white', borderBottom:'1px solid rgba(122,139,111,0.15)'}}>
        <div style={{fontSize:'1.3rem', color:'#7A8B6F'}}>Wellspring by Molly Gee</div>
        <a href="/dashboard" style={{textDecoration:'none', color:'#7A8B6F', fontSize:'0.9rem'}}>← Back to Dashboard</a>
      </nav>

      <div style={{maxWidth:'800px', margin:'0 auto', padding:'48px 24px'}}>
        <p style={{fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#C4956A', marginBottom:'8px'}}>Account Setup</p>
        <h1 style={{fontSize:'2rem', color:'#3D3530', marginBottom:'8px'}}>Practitioner Profile</h1>
        <p style={{color:'#B0A89E', marginBottom:'40px', fontSize:'0.9rem'}}>This information personalizes the reports you generate for your clients.</p>

        <div style={sectionStyle}>
          <h2 style={{fontSize:'1.1rem', color:'#3D3530', marginBottom:'20px'}}>Your Practice</h2>
          <label style={labelStyle}>Services You Offer</label>
          <textarea
            value={profile.services_offered}
            onChange={e => setProfile({...profile, services_offered: e.target.value})}
            style={textareaStyle}
            placeholder="e.g. Headspa scalp facials, trichology consultations, epigenetic hair scanning, laser therapy..."
          />
        </div>

        <div style={sectionStyle}>
          <h2 style={{fontSize:'1.1rem', color:'#3D3530', marginBottom:'8px'}}>Retail Products</h2>
          <p style={{fontSize:'0.85rem', color:'#B0A89E', marginBottom:'20px'}}>Add products you carry and sell. Include a purchase link if you sell online.</p>
          <DynamicRows
            arr={retailLinks}
            setArr={setRetailLinks}
            namePlaceholder="Product name (e.g. LockRX Glow & Grow Shampoo)"
            linkPlaceholder="Purchase link (optional)"
          />
        </div>

        <div style={sectionStyle}>
          <h2 style={{fontSize:'1.1rem', color:'#3D3530', marginBottom:'8px'}}>Supplement Affiliate Links</h2>
          <p style={{fontSize:'0.85rem', color:'#B0A89E', marginBottom:'20px'}}>All fields are optional. Add your affiliate links so supplement recommendations link directly to your account.</p>

          {[
            ['ohs_affiliate_link', 'OHS (Optimal Health Systems)', 'Your OHS affiliate link', null],
            ['equilife_affiliate_link', 'EquiLife', 'Your EquiLife affiliate link', null],
            ['olive_tree_affiliate_link', 'Olive Tree People', 'Your Olive Tree People affiliate link', 'Create your affiliate account under Wellspring at olivetreepeople.com'],
            ['frequense_affiliate_link', 'Frequense', 'Your Frequense affiliate link', 'Create your affiliate account under Wellspring at frequense.com'],
            ['monat_affiliate_link', 'Monat', 'Your Monat affiliate link', 'Create your affiliate account under Wellspring at monat.com'],
            ['lifevantage_affiliate_link', 'LifeVantage', 'Your LifeVantage affiliate link', 'Create your affiliate account under Wellspring at lifevantage.com'],
            ['fullscript_link', 'Fullscript', 'Your Fullscript dispensary link', null],
          ].map(([key, label, placeholder, hint]) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              {hint && <p style={{fontSize:'0.8rem', color:'#C4956A', marginBottom:'6px'}}>💡 {hint}</p>}
              <input
                type="url"
                value={profile[key]}
                onChange={e => setProfile({...profile, [key]: e.target.value})}
                style={{...inputStyle, width:'100%', marginBottom:'16px', display:'block'}}
                placeholder={placeholder}
              />
            </div>
          ))}

          <label style={{...labelStyle, marginTop:'8px'}}>Additional Supplement Brands</label>
          <p style={{fontSize:'0.85rem', color:'#B0A89E', marginBottom:'12px'}}>Add any other supplement brands you recommend with their affiliate links.</p>
          <DynamicRows
            arr={additionalSupplements}
            setArr={setAdditionalSupplements}
            namePlaceholder="Brand or product name"
            linkPlaceholder="Affiliate link (optional)"
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