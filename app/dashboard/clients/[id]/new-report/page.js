'use client'

import { useState, useEffect } from 'react'

const NUTRIENTS = {
  Vitamins: [
    'Vitamin A (Retinol)',
    'Vitamin B1 (Thiamine)',
    'Vitamin B2 (Riboflavin)',
    'Vitamin B3 (Niacin)',
    'Vitamin B5 (Pantothenic Acid)',
    'Vitamin B6 (Pyridoxine)',
    'Vitamin B7 (Biotin)',
    'Vitamin B9 (Folate)',
    'Vitamin B12 (Cobalamin)',
    'Vitamin C',
    'Vitamin D',
    'Vitamin E',
    'Vitamin K1',
    'Vitamin K2',
    'Inositol',
    'Betaine'
  ],
  Minerals: [
    'Boron',
    'Calcium',
    'Chromium',
    'Copper',
    'Iodine',
    'Iron',
    'Lithium',
    'Magnesium',
    'Manganese',
    'Molybdenum',
    'Potassium',
    'Selenium',
    'Silicon',
    'Sodium',
    'Sulfur',
    'Zinc'
  ],
  'Fatty Acids': [
    'Omega-3 ALA (Alpha-Linolenic Acid)',
    'Omega-3 EPA (Eicosapentaenoic Acid)',
    'Omega-3 DHA (Docosahexaenoic Acid)',
    'Omega-6 Linoleic Acid (LA)',
    'Omega-6 GLA (Gamma-Linolenic Acid)',
    'Omega-6 Arachidonic Acid (AA)',
    'Oleic Acid (Omega-9)'
  ],
  Antioxidants: [
    'Alpha-Lipoic Acid',
    'Anthocyanidins',
    'Carotenoids',
    'CoQ10 (Coenzyme Q10)',
    'Flavonoids',
    'Phytoestrogen',
    'Polyphenols',
    'SOD (Superoxide Dismutase)',
    'Sulforaphane',
    'Selenium',
    'Vitamin C (Antioxidant)',
    'Vitamin E (Antioxidant)'
  ],
  'Amino Acids': [
    'Alanine',
    'Arginine',
    'Asparagine',
    'Aspartic Acid',
    'Carnitine',
    'Carnosine',
    'Citrulline',
    'Cysteine',
    'Cystine',
    'Glutamic Acid',
    'Glutamine',
    'Glycine',
    'Histidine',
    'Isoleucine',
    'Leucine',
    'Lysine',
    'Methionine',
    'Ornithine',
    'Phenylalanine',
    'Proline',
    'Serine',
    'Taurine',
    'Threonine',
    'Tryptophan',
    'Tyrosine',
    'Valine'
  ]
}

const FORCE_MULTIPLIERS = {
  Pathogens: [
    'Bacteria',
    'Fungus / Yeast',
    'Parasites',
    'Virus',
    'Post-Virus',
    'Mold / Spores'
  ],
  Exposures: [
    'Frequency Interference',
    'Radiation',
    'Toxic Metals',
    'Chemicals / Hydrocarbons'
  ]
}

const FLAG_COLORS = {
  P: { bg: '#C0392B' },
  A: { bg: '#C4956A' },
  C: { bg: '#7A8B6F' }
}

export default function NewReport({ params }) {
  const [user, setUser] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [skipLabs, setSkipLabs] = useState(false)
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0])
  const [nutrientFlags, setNutrientFlags] = useState({})
  const [fmFlags, setFmFlags] = useState({})

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

  const toggleFlag = (name, level, setFlags) => {
    setFlags(prev => {
      const current = prev[name]
      if (current === level) {
        const updated = { ...prev }
        delete updated[name]
        return updated
      }
      return { ...prev, [name]: level }
    })
  }

  const getFlagged = (flags, level) =>
    Object.entries(flags).filter(([, v]) => v === level).map(([k]) => k).join(', ')

  const saveReport = async () => {
    setSaving(true)
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    const scanData = {
      ...scan,
      priority_nutrients: getFlagged(nutrientFlags, 'P'),
      advisory_nutrients: getFlagged(nutrientFlags, 'A'),
      consider_nutrients: getFlagged(nutrientFlags, 'C'),
      force_multipliers_priority: getFlagged(fmFlags, 'P'),
      force_multipliers_advisory: getFlagged(fmFlags, 'A'),
      force_multipliers_consider: getFlagged(fmFlags, 'C'),
    }
    const { error } = await supabase.from('reports').insert([{
      client_id: params.id,
      practitioner_id: user.id,
      visit_date: visitDate,
      report_data: { intake, scan: scanData, labs: skipLabs ? null : labs, protocol },
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

  const inputStyle = { width: '100%', padding: '10px 12px', border: '1px solid rgba(122,139,111,0.3)', borderRadius: '4px', fontSize: '0.9rem', fontFamily: 'Georgia, serif', marginBottom: '12px', backgroundColor: '#FDFCFA', boxSizing: 'border-box' }
  const textareaStyle = { ...inputStyle, minHeight: '80px', resize: 'vertical' }
  const sectionStyle = { backgroundColor: 'white', padding: '32px', borderRadius: '8px', border: '1px solid rgba(122,139,111,0.15)', marginBottom: '24px' }
  const labelStyle = { display: 'block', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7A8B6F', marginBottom: '6px', fontFamily: 'Georgia, serif' }

  const NutrientSelector = ({ categories, flags, setFlags }) => (
    <div>
      {Object.entries(categories).map(([category, items]) => (
        <div key={category} style={{ marginBottom: '28px' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4956A', marginBottom: '12px', fontFamily: 'Georgia, serif', fontWeight: 'bold' }}>
            {category}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {items.map(name => {
              const current = flags[name]
              return (
                <div key={name} style={{ display: 'flex', alignItems: 'stretch', border: `1px solid ${current ? FLAG_COLORS[current].bg : 'rgba(122,139,111,0.25)'}`, borderRadius: '4px', overflow: 'hidden', backgroundColor: 'white', transition: 'border-color 0.15s ease' }}>
                  <span style={{ padding: '6px 10px', fontSize: '0.82rem', color: '#3D3530', fontFamily: 'Georgia, serif', borderRight: '1px solid rgba(122,139,111,0.2)', display: 'flex', alignItems: 'center' }}>
                    {name}
                  </span>
                  {['P', 'A', 'C'].map(level => (
                    <button
                      key={level}
                      onClick={() => toggleFlag(name, level, setFlags)}
                      style={{
                        width: '28px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.72rem',
                        fontWeight: 'bold',
                        backgroundColor: current === level ? FLAG_COLORS[level].bg : 'transparent',
                        color: current === level ? 'white' : '#C0B8B0',
                        borderRight: level !== 'C' ? '1px solid rgba(122,139,111,0.15)' : 'none',
                        transition: 'all 0.15s ease',
                        fontFamily: 'Georgia, serif'
                      }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )

  const FlagSummary = ({ flags }) => {
    const p = getFlagged(flags, 'P')
    const a = getFlagged(flags, 'A')
    const c = getFlagged(flags, 'C')
    if (!p && !a && !c) return null
    return (
      <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#FAF7F2', borderRadius: '4px', border: '1px solid rgba(122,139,111,0.2)', fontSize: '0.85rem', lineHeight: 1.8 }}>
        <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B0A89E', marginBottom: '8px' }}>Current Selections</div>
        {p && <div><span style={{ color: '#C0392B', fontWeight: 'bold' }}>Priority: </span><span style={{ color: '#3D3530' }}>{p}</span></div>}
        {a && <div><span style={{ color: '#C4956A', fontWeight: 'bold' }}>Advisory: </span><span style={{ color: '#3D3530' }}>{a}</span></div>}
        {c && <div><span style={{ color: '#7A8B6F', fontWeight: 'bold' }}>Consider: </span><span style={{ color: '#3D3530' }}>{c}</span></div>}
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2', fontFamily: 'Georgia, serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', backgroundColor: 'white', borderBottom: '1px solid rgba(122,139,111,0.15)' }}>
        <div style={{ fontSize: '1.3rem', color: '#7A8B6F' }}>Wellspring by Molly Gee</div>
        <a href={'/dashboard/clients/' + params.id} style={{ textDecoration: 'none', color: '#7A8B6F', fontSize: '0.9rem' }}>← Back to Client</a>
      </nav>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px' }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4956A', marginBottom: '8px' }}>New Visit Report</p>
        <h1 style={{ fontSize: '2rem', color: '#3D3530', marginBottom: '8px' }}>Enter Visit Data</h1>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '36px', flexWrap: 'wrap' }}>
          <div style={{ padding: '5px 14px', backgroundColor: 'rgba(192,57,43,0.1)', borderRadius: '4px', fontSize: '0.78rem', color: '#C0392B', fontWeight: 'bold' }}>P = Priority</div>
          <div style={{ padding: '5px 14px', backgroundColor: 'rgba(196,149,106,0.15)', borderRadius: '4px', fontSize: '0.78rem', color: '#C4956A', fontWeight: 'bold' }}>A = Advisory</div>
          <div style={{ padding: '5px 14px', backgroundColor: 'rgba(122,139,111,0.15)', borderRadius: '4px', fontSize: '0.78rem', color: '#7A8B6F', fontWeight: 'bold' }}>C = Consider</div>
          <div style={{ padding: '5px 14px', backgroundColor: 'white', border: '1px solid rgba(122,139,111,0.2)', borderRadius: '4px', fontSize: '0.78rem', color: '#B0A89E' }}>Click same button again to clear</div>
        </div>

        <div style={sectionStyle}>
          <h2 style={{ fontSize: '1.1rem', color: '#3D3530', marginBottom: '20px' }}>Visit Date</h2>
          <input type="date" value={visitDate} onChange={e => setVisitDate(e.target.value)} style={inputStyle} />
        </div>

        <div style={sectionStyle}>
          <h2 style={{ fontSize: '1.1rem', color: '#3D3530', marginBottom: '20px' }}>Client Intake</h2>
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
              <textarea value={intake[key]} onChange={e => setIntake({ ...intake, [key]: e.target.value })} style={textareaStyle} placeholder={label} />
            </div>
          ))}
        </div>

        <div style={sectionStyle}>
          <h2 style={{ fontSize: '1.1rem', color: '#3D3530', marginBottom: '20px' }}>CWB Scan Overview</h2>

          <label style={labelStyle}>Report Type</label>
          <select value={scan.report_type} onChange={e => setScan({ ...scan, report_type: e.target.value })} style={inputStyle}>
            <option>Immunity & Wellbeing</option>
            <option>Hair, Skin & Nails</option>
          </select>

          <label style={labelStyle}>Total Immune Value</label>
          <input value={scan.total_immune_value} onChange={e => setScan({ ...scan, total_immune_value: e.target.value })} style={inputStyle} placeholder="e.g. 103" />

          {isImmunity && (
            <>
              <label style={labelStyle}>Gut Support Value</label>
              <input value={scan.gut_support_value} onChange={e => setScan({ ...scan, gut_support_value: e.target.value })} style={inputStyle} placeholder="e.g. 32" />
            </>
          )}

          <label style={labelStyle}>Flagged Systems</label>
          <textarea value={scan.flagged_systems} onChange={e => setScan({ ...scan, flagged_systems: e.target.value })} style={textareaStyle} placeholder="List all flagged systems from the scan overview" />
        </div>

        <div style={sectionStyle}>
          <h2 style={{ fontSize: '1.1rem', color: '#3D3530', marginBottom: '6px' }}>Nutrients</h2>
          <p style={{ fontSize: '0.85rem', color: '#B0A89E', marginBottom: '24px' }}>Click P, A, or C next to each flagged nutrient. Click the same button again to clear.</p>
          <NutrientSelector categories={NUTRIENTS} flags={nutrientFlags} setFlags={setNutrientFlags} />
          <FlagSummary flags={nutrientFlags} />
        </div>

        <div style={sectionStyle}>
          <h2 style={{ fontSize: '1.1rem', color: '#3D3530', marginBottom: '6px' }}>Force Multipliers</h2>
          <p style={{ fontSize: '0.85rem', color: '#B0A89E', marginBottom: '24px' }}>Flag any pathogens or environmental exposures identified in the scan.</p>
          <NutrientSelector categories={FORCE_MULTIPLIERS} flags={fmFlags} setFlags={setFmFlags} />
          <FlagSummary flags={fmFlags} />
        </div>

        <div style={sectionStyle}>
          <h2 style={{ fontSize: '1.1rem', color: '#3D3530', marginBottom: '20px' }}>Food Flags</h2>

          <label style={labelStyle}>Foods to Avoid</label>
          <textarea value={scan.foods_to_avoid} onChange={e => setScan({ ...scan, foods_to_avoid: e.target.value })} style={textareaStyle} placeholder="Foods flagged to avoid from the scan" />

          {isImmunity && (
            <>
              <label style={labelStyle}>Food Restrictions</label>
              <textarea value={scan.food_restrictions} onChange={e => setScan({ ...scan, food_restrictions: e.target.value })} style={textareaStyle} placeholder="Food restrictions from scan" />
              <label style={labelStyle}>Food Intolerances</label>
              <textarea value={scan.food_intolerances} onChange={e => setScan({ ...scan, food_intolerances: e.target.value })} style={textareaStyle} placeholder="Food intolerances from scan" />
            </>
          )}

          <label style={labelStyle}>Root Cause Base Scenario (optional)</label>
          <textarea value={scan.base_scenario} onChange={e => setScan({ ...scan, base_scenario: e.target.value })} style={textareaStyle} placeholder="Leave blank if unsure — AI will suggest based on scan and intake data" />
        </div>

        <div style={sectionStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: '1.1rem', color: '#3D3530' }}>Bloodwork Results</h2>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#B0A89E', cursor: 'pointer' }}>
              <input type="checkbox" checked={skipLabs} onChange={e => setSkipLabs(e.target.checked)} />
              No bloodwork available — skip this section
            </label>
          </div>
          {!skipLabs && (
            <>
              <p style={{ fontSize: '0.85rem', color: '#B0A89E', marginBottom: '20px' }}>Enter available lab results. Leave blank if not run.</p>
              {[
                ['iron_panel', '1. Iron Panel', 'e.g. Ferritin: 18, Serum Iron: 65, TIBC: 380, Saturation: 17%'],
                ['cbc', '2. CBC with Differential', 'e.g. WBC: 6.2, RBC: 4.1, Hemoglobin: 12.8, MCV: 88, RDW: 14.2'],
                ['thyroid', '3. Complete Thyroid Panel', 'e.g. TSH: 2.8, Free T4: 1.1, Free T3: 2.9, Reverse T3: 18, TPO Ab: 42'],
                ['female_hormones', '4. Female Hormone Panel', 'e.g. Estradiol: 45, Progesterone: 0.8, FSH: 12, LH: 8, SHBG: 38'],
                ['male_hormones', '5. Male Hormone Panel', 'e.g. Total Testosterone: 420, Free Testosterone: 12, DHEA-S: 280, SHBG: 35'],
                ['vitamins_minerals', '6. Vitamins, Minerals & Micronutrients', 'e.g. Vitamin D: 28, B12: 380, Folate: 12, Zinc: 68'],
                ['inflammatory_stress', '7. Inflammatory & Stress Markers', 'e.g. hs-CRP: 2.4, Homocysteine: 11, Cortisol AM: 14'],
                ['metabolic_blood_sugar', '8. Metabolic & Blood Sugar', 'e.g. Fasting Glucose: 92, Fasting Insulin: 11, HbA1c: 5.4'],
                ['protein_nutritional', '9. Protein & Nutritional Status', 'e.g. Total Protein: 6.8, Albumin: 4.0, BUN: 12'],
                ['additional_markers', '10. Additional Markers', 'e.g. ANA: negative, EBV IgG: positive, Heavy metals: pending']
              ].map(([key, label, placeholder]) => (
                <div key={key}>
                  <label style={labelStyle}>{label}</label>
                  <textarea value={labs[key]} onChange={e => setLabs({ ...labs, [key]: e.target.value })} style={textareaStyle} placeholder={placeholder} />
                </div>
              ))}
            </>
          )}
        </div>

        <div style={sectionStyle}>
          <h2 style={{ fontSize: '1.1rem', color: '#3D3530', marginBottom: '6px' }}>Protocol Notes</h2>
          <p style={{ fontSize: '0.85rem', color: '#B0A89E', marginBottom: '20px' }}>Optional — fill in now or leave blank and let AI generate the full protocol.</p>
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
              <textarea value={protocol[key]} onChange={e => setProtocol({ ...protocol, [key]: e.target.value })} style={textareaStyle} placeholder={label} />
            </div>
          ))}
        </div>

        {message && <p style={{ color: '#C4956A', marginBottom: '16px', textAlign: 'center' }}>{message}</p>}

        <button onClick={saveReport} disabled={saving} style={{ width: '100%', padding: '16px', backgroundColor: '#7A8B6F', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving...' : 'Save Report'}
        </button>
      </div>
    </div>
  )
}
