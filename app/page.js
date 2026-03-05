jsxexport default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { background-color: #FAF7F2; }

        .hero {
          min-height: 100vh;
          background-color: #FAF7F2;
          display: flex;
          flex-direction: column;
          font-family: 'DM Sans', sans-serif;
        }

        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 48px;
          border-bottom: 1px solid rgba(122,139,111,0.15);
        }

        .logo {
          font-family: 'Instrument Serif', serif;
          font-size: 1.4rem;
          color: #7A8B6F;
          letter-spacing: 0.02em;
        }

        .nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
        }

        .nav-links a {
          text-decoration: none;
          color: #7A8B6F;
          font-size: 0.9rem;
          font-weight: 400;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: color 0.2s;
        }

        .nav-links a:hover { color: #C4956A; }

        .hero-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 80px 24px;
        }

        .eyebrow {
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #C4956A;
          margin-bottom: 24px;
          font-weight: 500;
        }

        h1 {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          color: #3D3530;
          line-height: 1.15;
          max-width: 720px;
          margin-bottom: 28px;
        }

        h1 em {
          font-style: italic;
          color: #7A8B6F;
        }

        .subtitle {
          font-size: 1.1rem;
          color: #7A7068;
          max-width: 480px;
          line-height: 1.7;
          margin-bottom: 48px;
          font-weight: 300;
        }

        .cta-group {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-primary {
          background-color: #7A8B6F;
          color: #FAF7F2;
          padding: 16px 36px;
          border: none;
          border-radius: 4px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          text-decoration: none;
          transition: background-color 0.2s;
        }

        .btn-primary:hover { background-color: #6a7a60; }

        .btn-secondary {
          background-color: transparent;
          color: #7A8B6F;
          padding: 16px 36px;
          border: 1.5px solid #7A8B6F;
          border-radius: 4px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background-color: #7A8B6F;
          color: #FAF7F2;
        }

        .divider {
          width: 60px;
          height: 1px;
          background-color: #C4956A;
          margin: 64px auto;
          opacity: 0.5;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 48px;
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }

        .feature {
          text-align: center;
          padding: 40px 32px;
          background: white;
          border-radius: 8px;
          border: 1px solid rgba(122,139,111,0.12);
        }

        .feature-icon {
          font-size: 2rem;
          margin-bottom: 20px;
        }

        .feature h3 {
          font-family: 'Instrument Serif', serif;
          font-size: 1.4rem;
          color: #3D3530;
          margin-bottom: 12px;
        }

        .feature p {
          font-size: 0.95rem;
          color: #7A7068;
          line-height: 1.7;
          font-weight: 300;
        }

        footer {
          text-align: center;
          padding: 32px;
          border-top: 1px solid rgba(122,139,111,0.15);
          font-size: 0.85rem;
          color: #B0A89E;
        }
      `}</style>

      <div className="hero">
        <nav>
          <div className="logo">Wellspring by Molly Gee</div>
          <ul className="nav-links">
            <li><a href="#">Practitioners</a></li>
            <li><a href="#">Clients</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">Root Cause Hair Restoration</p>
          <h1>
            Your hair tells a story.<br />
            <em>We help you read it.</em>
          </h1>
          <p className="subtitle">
            Epigenetic hair scanning meets trichology expertise — 
            giving practitioners and clients the clarity to address 
            hair loss at its root.
          </p>
          <div className="cta-group">
            <a href="#" className="btn-primary">I'm a Practitioner</a>
            <a href="#" className="btn-secondary">I'm a Client</a>
          </div>
        </div>

        <div className="divider"></div>

        <div className="features">
          <div className="feature">
            <div className="feature-icon">🌿</div>
            <h3>Root Cause Method</h3>
            <p>Go beyond symptoms. Our approach identifies the underlying nutrient, hormone, and lifestyle factors driving hair loss.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔬</div>
            <h3>Epigenetic Scanning</h3>
            <p>Hair strand analysis reveals 800+ indicators — giving practitioners a comprehensive picture no standard lab can provide.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📋</div>
            <h3>Clinical Protocols</h3>
            <p>Personalized, actionable restoration plans built from real data — not guesswork.</p>
          </div>
        </div>

        <footer>
          © 2025 Wellspring by Molly Gee · All rights reserved
        </footer>
      </div>
    </>
  );
}
```