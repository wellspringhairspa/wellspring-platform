'use client'

import { useState, useEffect } from 'react'

const SYSTEM_PROMPT = `You are a clinical report writer for Wellspring by Molly Gee, a certified trichologist and epigenetic hair restoration specialist. You write warm, professional, evidence-informed client reports based on Cell Well Being (CWB) epigenetic hair scan data and client intake information.

YOUR FRAMEWORK — THE ROOT CAUSE METHOD:
Nutrients flagged on the scan reflect DEMAND, UTILIZATION STRAIN, DIVERSION toward stress/detox/immune, or IMBALANCE — NOT isolated deficiency. Never say a client is "deficient" in a nutrient. Say the body is under strain, diverting resources, or showing demand.

Key principle: "Hair grows when the body feels safe." Address the base first.

THE 8 BASE SCENARIOS (identify the dominant one):
1. Stress & Adrenal Signaling — most common. Chronic HPA activation suppresses all non-essential functions including hair growth. Key signals: B5, B6, B12, magnesium, potassium, carnitine flagged; chronic stress history; adrenal-related systems tallying high.
2. Gut Dysfunction & Absorption — hidden base in "tried everything" clients. Key signals: multiple amino acids flagged (gut can't absorb protein), fungus/bacteria/parasites as force multipliers, food intolerances, digestive symptoms.
3. Liver & Detox Overload — processing capacity exceeded. Key signals: B9/folate, cysteine, glycine, methionine, copper flagged; medication history; chemical/hydrocarbon exposure; detox system tallying high.
4. Immune System Activation — systemic immune activation shuts down hair cycle. Key signals: vitamin D, vitamin C, zinc, selenium flagged; viral/pathogen force multipliers; autoimmune history.
5. Hormonal Signaling & Metabolic Stress — maintains hair loss rather than initiating it. Key signals: iodine, selenium, zinc, B6, tyrosine, boron flagged; thyroid history; hormonal events; PCOS, menopause, perimenopause.
6. Circulation & Nutrient Delivery — follicles aren't receiving nutrients. Subsections: fatty acid metabolism, sugar metabolism, circulatory. Key signals: iron, EPA, DHA, CoQ10, anthocyanidins flagged; chromium (blood sugar); poor circulation patterns.
7. Oxidative Stress & Inflammation — hostile follicle environment. Key signals: multiple antioxidants flagged; ALA, CoQ10, flavonoids, polyphenols; environmental exposures as force multipliers.
8. Protein Synthesis Capacity — body can't build keratin or structural proteins. Key signals: multiple amino acids flagged together; leucine, lysine, cysteine, methionine, proline; slow regrowth despite supplementation.

THE 4-LAYER ROOT CAUSE PYRAMID (build this for every report):
- Base Layer: The deepest dysfunction (one of the 8 scenarios above)
- Secondary Layer: Systems being pulled down by the base
- Force Multiplier Layer: Pathogens, exposures, food sensitivities amplifying the picture
- Hair Expression Layer: The visible result — how hair and scalp are affected

CROSS-REFERENCE LOGIC (nutrient → system tally):
Vitamins: A→Detox/Gut; B1→Energy/Adrenals; B2→Oxidative/Detox; B3→Energy/Adrenals; B5→Adrenals; B6→Brain/Detox/Hormones; B7→Protein Synthesis/Gut; B9→Detox/Hormones/Methylation; B12→Energy/Gut/Adrenals; C→Oxidative/Immune/Adrenals; D→Immune/Hormones; E→Oxidative/Detox; K1/K2→Circulatory/Hormones; Inositol→Emotions/Brain; Betaine→Detox/Brain/Methylation
Minerals: Boron→Hormones; Calcium→Hormones/Adrenals; Chromium→Sugar Metabolism; Copper→Detox/Circulatory; Iodine→Hormones/Thyroid; Iron→Circulatory/Energy; Lithium→Brain/Emotions; Magnesium→Energy/Adrenals/Sleep; Manganese→Oxidative Stress; Molybdenum→Detox/Gut; Potassium→Adrenals/Circulatory; Selenium→Immune/Hormones/Oxidative; Silicon→Musculoskeletal/Protein Synthesis; Sodium→Adrenals/Hydration; Sulfur→Detox/Gut; Zinc→Immune/Protein Synthesis/Hormones
Fatty Acids: ALA→Inflammation/Hormones; EPA→Immune/Anti-inflammatory; DHA→Brain/Nervous System; Linoleic→Inflammation/Skin; GLA→Hormones/Skin; Arachidonic→Immune/Inflammatory; Oleic→Membrane/Energy
Antioxidants: ALA→Oxidative/Mitochondria; Anthocyanidins→Circulatory; Carotenoids→Oxidative/Immune; CoQ10→Energy/Circulatory; Flavonoids→Oxidative/Circulatory; Phytoestrogen→Hormones; Polyphenols→Oxidative/Gut; Selenium→Immune/Oxidative; SOD→Oxidative; Sulforaphane→Detox
Amino Acids: Cysteine/Glycine/Glutamic Acid together→glutathione demand/Detox; Leucine/Isoleucine/Valine→Protein Synthesis/Energy; Lysine→Protein Synthesis/Immune; Methionine→Detox/Methylation; Tyrosine→Hormones/Brain/Adrenals; Carnitine→Energy/Adrenals; Taurine→Detox/Bile; Glutamine→Gut/Immune; Arginine→Circulatory/Detox; Tryptophan→Brain/Emotions/Sleep

SUPPLEMENT DATABASE — recommend from these ONLY (5-7 max per protocol, base first):

ADRENAL/STRESS BASE:
- Opti-Adrenal (OHS) — adrenal repair, cortisol regulation
- Optimal Cort-Adrena (OHS) — for high cortisol, take evening
- Essential Magnesium (OHS) — HPA axis support, 300+ cellular processes
- Opti-Methyl B (OHS) — methylated B-complex, energy, stress metabolism
- Essential B-12 Drops (OHS) — B12 for adrenal reset, cortisol rhythm

GUT/ABSORPTION BASE:
- Flora Blitz 100 (OHS) — 100 billion CFU, 90-day aggressive gut rebalance; transition to Optimal Flora Plus after
- Optimal Flora Plus (OHS) — daily maintenance probiotic
- Optimal 1 Digest-A-Meal (OHS) — digestive plant enzymes, breaks down all nutrients
- Opti-GI (OHS) — gut lining repair, toxin removal, epithelium support
- Candida & Bacteria Optimizer (EquiLife) — 3-month gut rebalance protocol

LIVER/DETOX BASE:
- Optimal Liver Kidney (OHS) — liver protection, detox support, medication burden
- Soft Cleanse Pak (OHS) — chlorella, pectin fibers, glutamine; heavy metal and toxin cleanse
- Essential Glutathione (OHS) — master antioxidant, detox support
- 7-Day Detox (EquiLife) — full body functional medicine detox
- Opti-Methyl B (OHS) — methylation support (B9/B12 flags)

IMMUNE BASE:
- Optimal Defense (OHS) — immune support, anti-infective
- Essential DAK1K2 (OHS) — vitamins A, D, K; immune + hormone support
- Optimal Longevi-D K2 (OHS) — vitamin D3/K2, immune modulation
- Opti-Immune VRL (OHS) — viral immune support

HORMONAL/THYROID BASE:
- Opti-Iodine (OHS) — thyroid hormone production, metabolic regulation
- Optimal Longevi-D K2 (OHS) — hormone precursor, calcium regulation
- Essential DAK1K2 (OHS) — A, D, K complex for hormone/immune
- Opti-Brain (OHS) — chromium, manganese, zinc; neurotransmitter + hormone support
- Estrogen Support (EquiLife) — estrogen clearance, hormonal balance

CIRCULATION/FATTY ACID BASE:
- Optimal EFA (OHS) — omega-3 from algae, flaxseed, borage oils; anti-inflammatory
- Essential Magnesium (OHS) — vascular function, ATP
- Optimal Iron (OHS) — oxygen delivery, ferritin support
- Optimal Fat Sugar Trim (OHS) — fat/sugar metabolism, blood sugar stabilization
- CoQ10 / Essential Ubiquinol (OHS) — mitochondrial energy, cardiovascular

OXIDATIVE STRESS BASE:
- NRF-1 & NRF-2 (LifeVantage) — reduces oxidative stress, inflammatory response
- Essential Glutathione (OHS) — master antioxidant
- Opti-Mito-Force (OHS) — mitochondrial defense, ALA, carnitine, cysteine
- Optimal Fruit & Veggie Plus (OHS) — broad antioxidant blend
- Essential Ubiquinol / CoQ10 (OHS) — antioxidant + energy

PROTEIN SYNTHESIS BASE:
- Optimal Muscle RX (OHS) — amino acid blend, lean muscle, keratin support
- Essential L-Carnitine (OHS) — fat as fuel, mitochondrial health
- Optimal Acute (OHS) — protease enzymes, biofilm breakdown, tissue repair
- Optimal 1 Digest-A-Meal (OHS) — enzyme support for protein absorption

PATHOGEN PROTOCOLS (add to base protocol if flagged):
- Bacteria: Flora Blitz 100 (OHS) + Optimal Defense (OHS) ± Optimal Zinc-Oxy Spray (OHS)
- Fungus/Yeast: Candida & Bacteria Optimizer (EquiLife) + Optimal Oxy-Pure (OHS) + Flora Blitz 100 (OHS)
- Parasites: Opti-Para (OHS) + Flora Blitz 100 (OHS) ± Para Support Protocol (EquiLife)
- Virus: Opti-Immune VRL (OHS) + Optimal Defense (OHS) + Exposure Protection Pak (OHS)
- Post-Virus: Exposure Protection Pak (OHS) + Optimal Defense (OHS) + Opti-Immune VRL (OHS)
- Mold/Spores: Mold Protocol (EquiLife) + Flora Blitz 100 (OHS) + Optimal Defense (OHS)

EXPOSURE PROTOCOLS (add if flagged):
- Toxic Metals: Soft Cleanse Pak (OHS) + Opti-Metals Detox (OHS) ± Heavy Metals Detox (EquiLife)
- Radiation: Essential Protect (OHS) + Opti-Iodine (OHS) + Optimal Fruit & Veggie Plus (OHS)
- Chemicals/Hydrocarbons: Soft Cleanse Pak (OHS) + Optimal Liver Kidney (OHS) + 7-Day Detox (EquiLife)
- Frequency Interference: Optimal 2 Whole Food Vitamin Mineral (OHS) + Flora Blitz 100 (OHS) + Opti-Brain (OHS)

OPTIONAL DETOX STARTING POINT (for heavy pathogen load):
- The Sanctuary 10-Day At-Home Detox Kit — 100% organic plant-based cleanse targeting parasites, bacteria, metals, chemicals, mold, candida. Begin 3-5 days before full moon.

ADDITIONAL PRODUCTS (outside FHC):
- Daily Hair Support (EquiLife) — targeted daily hair nutritional support
- Source Trace Minerals (Frequense) — potassium, magnesium, iron, calcium, zinc blend
- Advanced Trichology DHT Blocker — for androgenetic/genetic pattern hair loss

PROTOCOL RULES (NON-NEGOTIABLE):
1. Maximum 5-7 supplements total
2. Address base layer FIRST with 2-3 products
3. Layer in pathogen/exposure support ONLY if flagged
4. Look for products that cover multiple systems to keep protocol tight
5. Always note: start one at a time, 5-7 days apart to monitor tolerance
6. 90-day protocol cycles, then rescan
7. Always include medication note if medications are listed

MEDICATION DEPLETION REFERENCE:
- Birth control pills → B6, B9, B12, zinc, magnesium → recommend Opti-Methyl B + Essential Magnesium
- Metformin → B12, CoQ10 → recommend Essential B-12 Drops + Essential Ubiquinol
- SSRIs/antidepressants → B6, B12, folate, CoQ10, zinc → recommend Opti-Methyl B
- PPIs/antacids → B12, magnesium, zinc, iron → recommend Essential B-12 Drops + Essential Magnesium
- Thyroid medication → calcium absorption affected → note timing (take 4 hours apart)
- Statins → CoQ10 → recommend Essential Ubiquinol
- Antibiotics → B-complex, vitamin K, probiotics → recommend Flora Blitz 100 + Opti-Methyl B
- Spironolactone → potassium levels → monitor; no additional K supplementation
- Accutane/Isotretinoin → liver strain, vitamin A overload → Optimal Liver Kidney
- GLP-1 agonists (Ozempic/Wegovy) → zinc, B12, absorption → Essential B-12 Drops + protein support
- General anesthesia/surgery → B vitamins, antioxidants, amino acids → Opti-Methyl B + Essential Glutathione

REPORT FORMAT — WRITE EXACTLY 7 SECTIONS:

Use this exact structure. Write in warm, professional, client-friendly language. Use the client's first name throughout. Never use the word "deficiency." Do not mention the practitioner's name — write as "your practitioner" or "your trichologist."

---
EPIGENETIC HAIR RESTORATION REPORT
Personalized Analysis & Action Plan
---

SECTION 1: OVERVIEW & HAIR LOSS SUMMARY
2-3 paragraphs. Address the client by first name. Validate their experience. Summarize what the scan revealed at a high level — the root cause pattern, what's driving it, and how the systems connect. End with the key principle: "Hair grows when the body feels safe." Warm, hopeful, evidence-based tone.

SECTION 2: KEY DEFICIENCY & IMBALANCE CHART
Present a table with columns: Nutrient/Area | Hair & Scalp Impact | General Health Impact | Common Symptoms
Group flagged nutrients into meaningful clusters (e.g., B-vitamins together, amino acids together, fatty acids together). Write 4-8 rows covering the most clinically significant flags. After the table, write 1-2 sentences explaining the pattern.

SECTION 3: ROOT CAUSE PYRAMID
Explain all 4 layers clearly in client-friendly language:
- BASE LAYER: Name the base scenario and explain it in 2-3 sentences
- SECONDARY LAYER: Name 2-3 secondary systems and explain how the base is pulling them down
- FORCE MULTIPLIER LAYER: Explain any pathogens or exposures flagged and how they amplify the picture
- HAIR EXPRESSION LAYER: Connect everything to the visible hair and scalp effects

SECTION 4: MEDICATION & SUPPLEMENT REVIEW
If medications are listed: For each medication, note what it depletes and how that connects to the scan. Always include: "This does not mean you should change your medications. It means we need to replenish what they take." If no medications, write a brief note. If current supplements are listed, comment on whether to keep, adjust, or replace them.

SECTION 5: INTERNAL SUPPLEMENT PROTOCOL
Present as a numbered table: # | Supplement | Brand | What It Supports & Why Prioritized
Maximum 5-7 products. Lead with base-layer products. Add pathogen/exposure products only if flagged. Include a note on how to introduce them (one at a time, 5-7 days apart). Note the 90-day cycle. If heavy pathogen load present, mention The Sanctuary 10-Day Detox as an optional starting point.

SECTION 6: EXTERNAL HAIR & SCALP SUPPORT
In-clinic treatments: Reference relevant modalities based on the client's pattern (e.g., cold plasma therapy, headspa scalp facial, PRP-adjacent treatments). At-home daily care: Recommend appropriate scalp serums, growth-supportive shampoos, and topical care. Be specific about frequency and consistency.

SECTION 7: FOOD PROTOCOL & NEXT STEPS
A. Foods to remove (from scan flags — list what was provided)
B. Priority foods to add (organized by system — gut-healing, anti-inflammatory, protein-rich, antioxidant-rich, etc.)
C. Protective foods for any force multipliers flagged
D. Lifestyle & environmental notes (stress, sleep, hydration, EMF/exposure reduction if relevant)
E. What to expect (timeline: systemic improvement weeks 4-8, hair changes lag 3-6 months)
F. 90-day rescan recommendation

Always end with the standard disclaimer:
"This report is not medical advice and is intended for informational and educational purposes only. As your trichologist, I strongly recommend consulting with your doctor or a qualified healthcare provider before making any changes to your medications, supplements, or treatment plans to ensure they are safe and appropriate for your specific health needs."

TONE GUIDELINES:
- Warm, hopeful, collaborative — never alarming
- Clinical but accessible — explain every term in plain language
- Validate the client's experience — they've likely been dismissed before
- Position hair changes as the downstream result of systemic healing
- Never overwhelm — the report should feel empowering, not scary`

export default function ReportView({ params }) {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [aiReport, setAiReport] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const init = async () => {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }

      const { data } = await supabase
        .from('reports')
        .select('*')
        .eq('id', params.reportId)
        .single()

      if (data) {
        setReport(data)
        if (data.ai_report) setAiReport(data.ai_report)
      }
      setLoading(false)
    }
    init()
  }, [params.reportId])

  const generateReport = async () => {
    setGenerating(true)
    setError('')

    const rd = report.report_data
    const intake = rd?.intake || {}
    const scan = rd?.scan || {}
    const labs = rd?.labs || {}
    const protocol = rd?.protocol || {}

    const userMessage = `Please generate a complete 7-section Epigenetic Hair Restoration Report for this client.

CLIENT INTAKE:
- Primary concern: ${intake.primary_concern || 'Not provided'}
- Hair loss pattern: ${intake.hair_pattern || 'Not provided'}
- Timeline/onset: ${intake.onset || 'Not provided'}
- Medical history: ${intake.medical_history || 'None noted'}
- Current medications: ${intake.medications || 'None listed'}
- Current supplements: ${intake.supplements || 'None listed'}
- Hormonal history: ${intake.hormonal_notes || 'Not provided'}
- Gut/digestive symptoms: ${intake.gut_symptoms || 'None noted'}
- Stress level: ${intake.stress_level || 'Not provided'}
- Diet notes: ${intake.diet_notes || 'Not provided'}
- Recent events/life changes: ${intake.recent_events || 'None noted'}

CWB SCAN DATA:
- Report type: ${scan.report_type || 'Immunity & Wellbeing'}
- Total Immune Value: ${scan.total_immune_value || 'Not provided'}
- Gut Support Value: ${scan.gut_support_value || 'Not provided'}
- Flagged systems: ${scan.flagged_systems || 'Not provided'}
- Priority nutrients (P): ${scan.priority_nutrients || 'None'}
- Advisory nutrients (A): ${scan.advisory_nutrients || 'None'}
- Consider nutrients (C): ${scan.consider_nutrients || 'None'}
- Force multipliers - Priority: ${scan.force_multipliers_priority || 'None'}
- Force multipliers - Advisory: ${scan.force_multipliers_advisory || 'None'}
- Force multipliers - Consider: ${scan.force_multipliers_consider || 'None'}
- Foods to avoid: ${scan.foods_to_avoid || 'None listed'}
- Food restrictions: ${scan.food_restrictions || 'None listed'}
- Food intolerances: ${scan.food_intolerances || 'None listed'}
- Base scenario (if noted by practitioner): ${scan.base_scenario || 'Please identify from data'}

BLOODWORK (if available):
- Iron panel: ${labs?.iron_panel || 'Not available'}
- CBC: ${labs?.cbc || 'Not available'}
- Thyroid: ${labs?.thyroid || 'Not available'}
- Female hormones: ${labs?.female_hormones || 'Not available'}
- Male hormones: ${labs?.male_hormones || 'Not available'}
- Vitamins/minerals: ${labs?.vitamins_minerals || 'Not available'}
- Inflammatory/stress markers: ${labs?.inflammatory_stress || 'Not available'}
- Metabolic/blood sugar: ${labs?.metabolic_blood_sugar || 'Not available'}
- Protein/nutritional: ${labs?.protein_nutritional || 'Not available'}
- Additional markers: ${labs?.additional_markers || 'Not available'}

PRACTITIONER PROTOCOL NOTES (if pre-filled):
- Supplements noted: ${protocol?.supplements || 'None — please generate'}
- Food protocol noted: ${protocol?.foods || 'None — please generate'}
- Lifestyle noted: ${protocol?.lifestyle || 'None — please generate'}
- Further testing noted: ${protocol?.further_testing || 'None — please generate'}
- At-home topical: ${protocol?.topical_home || 'None — please generate'}
- In-clinic: ${protocol?.in_clinic || 'None — please generate'}
- Additional notes: ${protocol?.notes || 'None'}

Generate the complete 7-section client report now.`

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: userMessage }]
        })
      })

      const data = await response.json()
      const generated = data.content?.[0]?.text || ''

      if (!generated) {
        setError('Report generation failed. Please try again.')
        setGenerating(false)
        return
      }

      setAiReport(generated)

      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )
      await supabase
        .from('reports')
        .update({ ai_report: generated })
        .eq('id', params.reportId)

    } catch (err) {
      setError('Something went wrong. Please try again.')
    }

    setGenerating(false)
  }

  const regenerateReport = async () => {
    setAiReport('')
    await generateReport()
  }

  const copyReport = () => {
    navigator.clipboard.writeText(aiReport)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sectionStyle = { backgroundColor: 'white', padding: '32px', borderRadius: '8px', border: '1px solid rgba(122,139,111,0.15)', marginBottom: '24px' }
  const labelStyle = { fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B0A89E', marginBottom: '4px', display: 'block' }
  const valueStyle = { fontSize: '0.9rem', color: '#3D3530', lineHeight: 1.6 }

  if (loading) return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia, serif', color: '#7A8B6F' }}>
      Loading report...
    </div>
  )

  if (!report) return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia, serif', color: '#C4956A' }}>
      Report not found.
    </div>
  )

  const rd = report.report_data || {}
  const intake = rd.intake || {}
  const scan = rd.scan || {}
  const labs = rd.labs || {}
  const protocol = rd.protocol || {}

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2', fontFamily: 'Georgia, serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', backgroundColor: 'white', borderBottom: '1px solid rgba(122,139,111,0.15)' }}>
        <div style={{ fontSize: '1.3rem', color: '#7A8B6F' }}>Wellspring by Molly Gee</div>
        <a href={`/dashboard/clients/${params.id}`} style={{ textDecoration: 'none', color: '#7A8B6F', fontSize: '0.9rem' }}>← Back to Client</a>
      </nav>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px' }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4956A', marginBottom: '8px' }}>Visit Report</p>
        <h1 style={{ fontSize: '2rem', color: '#3D3530', marginBottom: '4px' }}>
          {report.visit_date ? new Date(report.visit_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Report'}
        </h1>
        <p style={{ color: '#B0A89E', fontSize: '0.9rem', marginBottom: '40px' }}>{scan.report_type || 'Immunity & Wellbeing'}</p>

        {/* Intake Summary */}
        <div style={sectionStyle}>
          <h2 style={{ fontSize: '1.1rem', color: '#3D3530', marginBottom: '20px' }}>Client Intake</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              ['Primary Concern', intake.primary_concern],
              ['Hair Pattern', intake.hair_pattern],
              ['Timeline', intake.onset],
              ['Medical History', intake.medical_history],
              ['Medications', intake.medications],
              ['Supplements', intake.supplements],
              ['Hormonal History', intake.hormonal_notes],
              ['Gut Symptoms', intake.gut_symptoms],
              ['Stress Level', intake.stress_level],
              ['Diet Notes', intake.diet_notes],
              ['Recent Events', intake.recent_events],
            ].filter(([, v]) => v).map(([label, value]) => (
              <div key={label}>
                <span style={labelStyle}>{label}</span>
                <span style={valueStyle}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scan Data */}
        <div style={sectionStyle}>
          <h2 style={{ fontSize: '1.1rem', color: '#3D3530', marginBottom: '20px' }}>Scan Data</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            {scan.total_immune_value && <div><span style={labelStyle}>Total Immune Value</span><span style={{ ...valueStyle, fontWeight: 'bold', color: '#7A8B6F' }}>{scan.total_immune_value}</span></div>}
            {scan.gut_support_value && <div><span style={labelStyle}>Gut Support Value</span><span style={{ ...valueStyle, fontWeight: 'bold', color: '#7A8B6F' }}>{scan.gut_support_value}</span></div>}
          </div>
          {[
            ['Flagged Systems', scan.flagged_systems],
            ['Priority Nutrients (P)', scan.priority_nutrients],
            ['Advisory Nutrients (A)', scan.advisory_nutrients],
            ['Consider Nutrients (C)', scan.consider_nutrients],
            ['Force Multipliers — Priority', scan.force_multipliers_priority],
            ['Force Multipliers — Advisory', scan.force_multipliers_advisory],
            ['Force Multipliers — Consider', scan.force_multipliers_consider],
            ['Foods to Avoid', scan.foods_to_avoid],
            ['Food Restrictions', scan.food_restrictions],
            ['Food Intolerances', scan.food_intolerances],
            ['Base Scenario', scan.base_scenario],
          ].filter(([, v]) => v).map(([label, value]) => (
            <div key={label} style={{ marginBottom: '12px' }}>
              <span style={labelStyle}>{label}</span>
              <span style={valueStyle}>{value}</span>
            </div>
          ))}
        </div>

        {/* Bloodwork */}
        {labs && Object.values(labs).some(v => v) && (
          <div style={sectionStyle}>
            <h2 style={{ fontSize: '1.1rem', color: '#3D3530', marginBottom: '20px' }}>Bloodwork</h2>
            {[
              ['Iron Panel', labs.iron_panel],
              ['CBC', labs.cbc],
              ['Thyroid', labs.thyroid],
              ['Female Hormones', labs.female_hormones],
              ['Male Hormones', labs.male_hormones],
              ['Vitamins & Minerals', labs.vitamins_minerals],
              ['Inflammatory & Stress', labs.inflammatory_stress],
              ['Metabolic & Blood Sugar', labs.metabolic_blood_sugar],
              ['Protein & Nutritional', labs.protein_nutritional],
              ['Additional Markers', labs.additional_markers],
            ].filter(([, v]) => v).map(([label, value]) => (
              <div key={label} style={{ marginBottom: '12px' }}>
                <span style={labelStyle}>{label}</span>
                <span style={valueStyle}>{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* AI Report Section */}
        <div style={{ ...sectionStyle, border: '1px solid rgba(196,149,106,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', color: '#3D3530', marginBottom: '4px' }}>AI Generated Client Report</h2>
              <p style={{ fontSize: '0.82rem', color: '#B0A89E' }}>
                {aiReport ? 'Generated and saved. Copy to share with your client.' : 'Click below to generate the full client report using your scan and intake data.'}
              </p>
            </div>
            {aiReport && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={copyReport} style={{ padding: '10px 20px', backgroundColor: '#7A8B6F', color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer' }}>
                  {copied ? '✓ Copied!' : 'Copy Report'}
                </button>
                <button onClick={regenerateReport} disabled={generating} style={{ padding: '10px 20px', backgroundColor: 'transparent', color: '#C4956A', border: '1px solid #C4956A', borderRadius: '4px', fontSize: '0.85rem', cursor: generating ? 'not-allowed' : 'pointer', opacity: generating ? 0.6 : 1 }}>
                  {generating ? 'Generating...' : 'Regenerate'}
                </button>
              </div>
            )}
          </div>

          {!aiReport && (
            <button
              onClick={generateReport}
              disabled={generating}
              style={{ width: '100%', padding: '18px', backgroundColor: generating ? '#B0A89E' : '#C4956A', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: generating ? 'not-allowed' : 'pointer', transition: 'background-color 0.2s' }}
            >
              {generating ? '⏳ Generating report — this takes about 30 seconds...' : '✨ Generate AI Client Report'}
            </button>
          )}

          {error && <p style={{ color: '#C0392B', marginTop: '12px', fontSize: '0.9rem' }}>{error}</p>}

          {generating && (
            <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#FAF7F2', borderRadius: '4px', textAlign: 'center', color: '#7A8B6F', fontSize: '0.9rem' }}>
              <div style={{ marginBottom: '8px', fontSize: '1.2rem' }}>🌿</div>
              Analyzing scan data and building your client report...<br />
              <span style={{ fontSize: '0.8rem', color: '#B0A89E' }}>Cross-referencing nutrients, identifying root cause pattern, selecting supplements</span>
            </div>
          )}

          {aiReport && (
            <div style={{ marginTop: '20px', padding: '24px', backgroundColor: '#FAF7F2', borderRadius: '4px', border: '1px solid rgba(122,139,111,0.15)', whiteSpace: 'pre-wrap', lineHeight: 1.8, fontSize: '0.88rem', color: '#3D3530', maxHeight: '600px', overflowY: 'auto' }}>
              {aiReport}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}