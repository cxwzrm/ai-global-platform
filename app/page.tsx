export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1e3a8a, #1e40af)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        fontWeight: 'bold', 
        color: 'white',
        marginBottom: '1rem'
      }}>
        AI Global Marketing Platform
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#bfdbfe' }}>
        Next.js + Vercel 部署成功！
      </p>
    </div>
  )
}
