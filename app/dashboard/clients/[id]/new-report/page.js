'use client'

import { useState, useEffect } from 'react'

export default function NewReport({ params }) {
  const [user, setUser] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [skipLabs, setSkipLabs] = useState(false)
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0])

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
    consider_nutrients: '',
    force_multipliers_priority: '',
    force_multipliers_advisory: '',
    force_multipliers_consider: '',
    foods_to_avoid: '',
    food_restrictions: '',
    food_intolerances: '',
    base_scenario: ''
  })

  const [labs, setLabs] = useState({
    iron_panel: '',
    cbc: '',
    thyroid: '',
    female_hormones: '',
    male_hormones: '',
    vitamins_minerals: '',
    inflammatory_stress: '',
    metabolic_blood_sugar: '',
    protein_nutritional: '',
    additional_markers: ''
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
      report_data: { intake, scan, labs: skipLabs ? null : labs, protocol },
      notes: intake.primary_concern
    }])
    if (error) {
      setMessage('Error saving. Please try again.')
    } else {
      window.location.href = `/dashboard/clients/${params.id}`
    }
    setSaving(false)
  }

  const isImmunity = scan.report_type === 'Immunity & Wellbeing'

  const inputStyle = {width:'100%', padding:'10px 12px', border:'1px solid rgba(122,139,111,0.3)', borderRadius:'4px', fontSize:'0.9rem', fontFamily:'Georgia, serif', marginBottom:'12px', backgroundColor:'#FDFCFA'}
  const textareaStyle = {...inputStyle, minHeight:'80px', resize:'vertical'}
  const sectionStyle = {backgroundColor:'white', padding:'32px', borderRadius:'8px', border:'1px solid rgba(122,139,111,0.15)', marginBottom:'24px'}
  const labelStyle = {display:'block', fontSize:'0.8rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'#7A8B6F', marginBottom:'6px', fontFamily:'Georgia, serif'}

  return (
    <div style={{minHeight:'100vh', backgroundColor:'#FAF7F2', fontFamily:'Georgia, serif'}}>
      <nav style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'24px 48px', backgroundColor:'white', borderBottom:'1px solid rgba(122,139,111,0.15)'}}>
        <div style={{fontSize:'1.3rem', color:'#7A8B6F'}}>Wellspring by Molly Gee</div>
        <a href={'/dashboard/clients/' + params.id} style={{textDecoration:'none', color:'#7A8B6F', fontSize:'0.9rem'}}>Back to Client</a>
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
            ['primary_concern','Primary Concern'],
            ['hair_pattern','Hair Loss Pattern & Location'],
            ['onset','When Did It Start / Timeline'],
            ['medical_history','Medical History'],
            ['medications','Current Medications'],
            ['supplements','Current Supplements'],
            ['hormonal_notes','Hormonal History'],
            ['gut_symptoms','Gut / Digestive Symptoms'],
            ['stress_level','Stress Level & Sources'],
            ['diet_notes','Diet Notes'],
            ['recent_events','Recent Events / Life Changes']
          ].map(([key, label]) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <textarea value={intake[key]} onChange={e => setIntake({...intake, [key]: e.target.value})} style={textareaStyle} placeholder={label} />
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

          <label style={labelStyle}>Total Immune Value</label>
          <input value={scan.total_immune_value} onChange={e => setScan({...scan, total_immune_value: e.target.value})} style={inputStyle} placeholder="e.g. 103" />

          {isImmunity && (
            <>
              <label style={labelStyle}>Gut Support Value</label>
              <input value={scan.gut_support_value} onChange={e => setScan({...scan, gut_support_value: e.target.value})} style={inputStyle} placeholder="e.g. 32" />
            </>
          )}

          <label style={labelStyle}>Flagged Systems</label>
          <textarea value={scan.flagged_systems} onChange={e => setScan({...scan, flagged_systems: e.target.value})} style={textareaStyle} placeholder="List all flagged systems" />

          <label style={labelStyle}>Priority Nutrients</label>
          <textarea value={scan.priority_nutrients} onChange={e => setScan({...scan, priority_nutrients: e.target.value})} style={textareaStyle} placeholder="Nutrients flagged as Priority" />

          <label style={labelStyle}>Advisory Nutrients</label>
          <textarea value={scan.advisory_nutrients} onChange={e => setScan({...scan, advisory_nutrients: e.target.value})} style={textareaStyle} placeholder="Nutrients flagged as Advisory" />

          <label style={labelStyle}>Consider Nutrients</label>
          <textarea value={scan.consider_nutrients} onChange={e => setScan({...scan, consider_nutrients: e.target.value})} style={textareaStyle} placeholder="Nutrients flagged as Consider" />

          <label style={labelStyle}>Force Multipliers — Priority</label>
          <textarea value={scan.force_multipliers_priority} onChange={e => setScan({...scan, force_multipliers_priority: e.target.value})} style={textareaStyle} placeholder="Priority force multipliers (pathogens, exposures, food sensitivities)" />

          <label style={labelStyle}>Force Multipliers — Advisory</label>
          <textarea value={scan.force_multipliers_advisory} onChange={e => setScan({...scan, force_multipliers_advisory: e.target.value})} style={textareaStyle} placeholder="Advisory force multipliers" />

          <label style={labelStyle}>Force Multipliers — Consider</label>
          <textarea value={scan.force_multipliers_consider} onChange={e => setScan({...scan, force_multipliers_consider: e.target.value})} style={textareaStyle} placeholder="Consider force multipliers" />

          <label style={labelStyle}>Foods to Avoid</label>
          <textarea value={scan.foods_to_avoid} onChange={e => setScan({...scan, foods_to_avoid: e.target.value})} style={textareaStyle} placeholder="Foods flagged to avoid" />

          {isImmunity && (
            <>
              <label style={labelStyle}>Food Restrictions</label>
              <textarea value={scan.food_restrictions} onChange={e => setScan({...scan, food_restrictions: e.target.value})} style={textareaStyle} placeholder="Food restrictions from scan" />

              <label style={labelStyle}>Food Intolerances</label>
              <textarea value={scan.food_intolerances} onChange={e => setScan({...scan, food_intolerances: e.target.value})} style={textareaStyle} placeholder="Food intolerances from scan" />
            </>
          )}

          <label style={labelStyle}>Root Cause Base Scenario (optional — AI will help identify if unsure)</label>
          <textarea value={scan.base_scenario} onChange={e => setScan({...scan, base_scenario: e.target.value})} style={textareaStyle} placeholder="Leave blank if unsure — the AI will suggest a base scenario based on scan and intake data" />
        </div>

        <div style={sectionStyle}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
            <h2 style={{fontSize:'1.1rem', color:'#3D3530'}}>Bloodwork Results</h2>
            <label style={{display:'flex', alignItems:'center', gap:'8px', fontSize:'0.85rem', color:'#B0A89E', cursor:'pointer'}}>
              <input type="checkbox" checked={skipLabs} onChange={e => setSkipLabs(e.target.checked)} />
              No bloodwork available — skip this section
            </label>
          </div>

          {!skipLabs && (
            <>
              <p style={{fontSize:'0.85rem', color:'#B0A89E', marginBottom:'20px'}}>Enter any available lab results. Leave blank if not run. Include marker name and value where possible.</p>
              {[
                ['iron_panel','1. Iron Panel','e.g. Ferritin: 18, Serum Iron: 65, TIBC: 380, Saturation: 17%'],
                ['cbc','2. CBC with Differential','e.g. WBC: 6.2, RBC: 4.1, Hemoglobin: 12.8, MCV: 88, RDW: 14.2'],
                ['thyroid','3. Complete Thyroid Panel','e.g. TSH: 2.8, Free T4: 1.1, Free T3: 2.9, Reverse T3: 18, TPO Ab: 42'],
                ['female_hormones','4. Female Hormone Panel','e.g. Estradiol: 45, Progesterone: 0.8, FSH: 12, LH: 8, SHBG: 38'],
                ['male_hormones','5. Male Hormone Panel','e.g. Total Testosterone: 420, Free Testosterone: 12, DHEA-S: 280, SHBG: 35'],
                ['vitamins_minerals','6. Vitamins, Minerals & Micronutrients','e.g. Vitamin D: 28, B12: 380, Folate: 12, Zinc: 68, Magnesium: 1.8'],
                ['inflammatory_stress','7. Inflammatory & Stress Markers','e.g. hs-CRP: 2.4, Homocysteine: 11, Cortisol AM: 14, DHEA-S: 180'],
                ['metabolic_blood_sugar','8. Metabolic & Blood Sugar Markers','e.g. Fasting Glucose: 92, Fasting Insulin: 11, HbA1c: 5.4, HOMA-IR: 2.5'],
                ['protein_nutritional','9. Protein & Nutritional Status','e.g. Total Protein: 6.8, Albumin: 4.0, BUN: 12'],
                ['additional_markers','10. Additional Markers','e.g. ANA: negative, EBV IgG: positive, Heavy metals: pending']
              ].map(([key, label, placeholder]) => (
                <div key={key}>
                  <label style={labelStyle}>{label}</label>
                  <textarea value={labs[key]} onChange={e => setLabs({...labs, [key]: e.target.value})} style={textareaStyle} placeholder={placeholder} />
                </div>
              ))}
            </>
          )}
        </div>

        <div style={sectionStyle}>
          <h2 style={{fontSize:'1.1rem', color:'#3D3530', marginBottom:'20px'}}>Protocol Notes</h2>
          <p style={{fontSize:'0.85rem', color:'#B0A89E', marginBottom:'20px'}}>Optional — fill in any protocol decisions before AI generation, or leave blank and let the AI build it.</p>
          {[
            ['supplements','Supplement Recommendations'],
            ['foods','Food Protocol'],
            ['lifestyle','Lifestyle Recommendations'],
            ['further_testing','Further Testing Recommended'],
            ['topical_home','At-Home Topical Care'],
            ['in_clinic','In-Clinic Treatments'],
            ['notes','Additional Notes']
          ].map(([key, label]) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <textarea value={protocol[key]} onChange={e => setProtocol({...protocol, [key]: e.target.value})} style={textareaStyle} placeholder={label} />
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