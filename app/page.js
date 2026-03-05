export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#FAF7F2',
      fontFamily: 'DM Sans, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontFamily: 'Instrument Serif, serif',
        fontSize: '3rem',
        color: '#7A8B6F',
        marginBottom: '16px'
      }}>
        Wellspring by Molly Gee
      </h1>
      <p style={{
        fontSize: '1.2rem',
        color: '#C4956A',
        maxWidth: '500px',
        lineHeight: '1.6'
      }}>
        Hair restoration rooted in science. <br />
        Coming soon.
      </p>
    </main>
  );
}