'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessage(error.message)
    } else {
      window.location.href = '/dashboard'
    }
  }

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Check your email to confirm your account!')
    }
  }

  return (
    <div style={{minHeight:'100vh', backgroundColor:'#FAF7F2', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Georgia, serif'}}>
      <div style={{backgroundColor:'white', padding:'48px', borderRadius:'8px', border:'1px solid rgba(122,139,111,0.2)', width:'100%', maxWidth:'400px'}}>
        <h1 style={{fontSize:'1.8rem', color:'#7A8B6F', marginBottom:'8px', textAlign:'center'}}>Wellspring</h1>
        <p style={{fontSize:'0.85rem', color:'#B0A89E', textAlign:'center', marginBottom:'32px'}}>Practitioner Portal</p>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{width:'100%', padding:'12px', border:'1px solid rgba(122,139,111,0.3)', borderRadius:'4px', marginBottom:'12px', fontSize:'0.95rem', fontFamily:'Georgia, serif'}}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{width:'100%', padding:'12px', border:'1px solid rgba(122,139,111,0.3)', borderRadius:'4px', marginBottom:'24px', fontSize:'0.95rem', fontFamily:'Georgia, serif'}}
        />
        
        <button onClick={handleLogin} style={{width:'100%', padding:'14px', backgroundColor:'#7A8B6F', color:'white', border:'none', borderRadius:'4px', fontSize:'0.95rem', cursor:'pointer', marginBottom:'12px'}}>
          Log In
        </button>
        <button onClick={handleSignup} style={{width:'100%', padding:'14px', backgroundColor:'transparent', color:'#7A8B6F', border:'1.5px solid #7A8B6F', borderRadius:'4px', fontSize:'0.95rem', cursor:'pointer'}}>
          Create Account
        </button>
        
        {message && <p style={{marginTop:'16px', textAlign:'center', fontSize:'0.9rem', color:'#C4956A'}}>{message}</p>}
      </div>
    </div>
  )
}