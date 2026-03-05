export default function Home() {
  return (
    <div style={{minHeight:'100vh', backgroundColor:'#FAF7F2', fontFamily:'Georgia, serif', display:'flex', flexDirection:'column'}}>
      
      <nav style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'28px 48px', borderBottom:'1px solid rgba(122,139,111,0.15)'}}>
        <div style={{fontSize:'1.4rem', color:'#7A8B6F'}}>Wellspring by Molly Gee</div>
        <div style={{display:'flex', gap:'32px'}}>
          <a href="#" style={{textDecoration:'none', color:'#7A8B6F', fontSize:'0.9rem'}}>Practitioners</a>
          <a href="#" style={{textDecoration:'none', color:'#7A8B6F', fontSize:'0.9rem'}}>Clients</a>
          <a href="#" style={{textDecoration:'none', color:'#7A8B6F', fontSize:'0.9rem'}}>About</a>
        </div>
      </nav>

      <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'80px 24px'}}>
        <p style={{fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#C4956A', marginBottom:'24px'}}>Root Cause Hair Restoration</p>
        <h1 style={{fontSize:'3.5rem', color:'#3D3530', lineHeight:1.15, maxWidth:'720px', marginBottom:'28px'}}>
          Your hair tells a story.<br/>
          <span style={{fontStyle:'italic', color:'#7A8B6F'}}>We help you read it.</span>
        </h1>
        <p style={{fontSize:'1.1rem', color:'#7A7068', maxWidth:'480px', lineHeight:1.7, marginBottom:'48px'}}>
          Epigenetic hair scanning meets trichology expertise — giving practitioners and clients the clarity to address hair loss at its root.
        </p>
        <div style={{display:'flex', gap:'16px', flexWrap:'wrap', justifyContent:'center'}}>
          <a href="#" style={{backgroundColor:'#7A8B6F', color:'#FAF7F2', padding:'16px 36px', borderRadius:'4px', textDecoration:'none', fontSize:'0.95rem'}}>I am a Practitioner</a>
          <a href="#" style={{backgroundColor:'transparent', color:'#7A8B6F', padding:'16px 36px', borderRadius:'4px', textDecoration:'none', fontSize:'0.95rem', border:'1.5px solid #7A8B6F'}}>I am a Client</a>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'32px', maxWidth:'1000px', margin:'0 auto', padding:'0 24px 80px'}}>
        {[
          {icon:'🌿', title:'Root Cause Method', text:'Go beyond symptoms. Identify the underlying nutrient, hormone, and lifestyle factors driving hair loss.'},
          {icon:'🔬', title:'Epigenetic Scanning', text:'Hair strand analysis reveals 800+ indicators — a comprehensive picture no standard lab can provide.'},
          {icon:'📋', title:'Clinical Protocols', text:'Personalized, actionable restoration plans built from real data — not guesswork.'}
        ].map((f) => (
          <div key={f.title} style={{textAlign:'center', padding:'40px 32px', background:'white', borderRadius:'8px', border:'1px solid rgba(122,139,111,0.12)'}}>
            <div style={{fontSize:'2rem', marginBottom:'20px'}}>{f.icon}</div>
            <h3 style={{fontSize:'1.4rem', color:'#3D3530', marginBottom:'12px'}}>{f.title}</h3>
            <p style={{fontSize:'0.95rem', color:'#7A7068', lineHeight:1.7}}>{f.text}</p>
          </div>
        ))}
      </div>

      <footer style={{textAlign:'center', padding:'32px', borderTop:'1px solid rgba(122,139,111,0.15)', fontSize:'0.85rem', color:'#B0A89E'}}>
        © 2025 Wellspring by Molly Gee · All rights reserved
      </footer>
    </div>
  );
}
```