'use client'
import { useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function AnalysePage() {
  const [idQuotation, setIdQuotation] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setData(null)
    const res = await fetch(`${API_URL}/api/analyse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_quotation: idQuotation })
    })
    const result = await res.json()
    setData(result)
    setLoading(false)
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>🔍 Analyse Pièces</h1>
      <input
        value={idQuotation}
        onChange={e => setIdQuotation(e.target.value)}
        placeholder="Entrez ID_QUOTATION"
        style={{ padding: '0.5rem', marginRight: '1rem' }}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Chargement...' : 'Analyser'}
      </button>

      {data?.analysis && (
        <div style={{ marginTop: '2rem' }}>
          <h2>🧠 Résultat IA</h2>
          <p style={{ background: '#f0f0f0', padding: '1rem' }}>{data.analysis}</p>
        </div>
      )}

      {data?.filtered?.length > 0 && (
        <>
          <h3 style={{ marginTop: '2rem' }}>📦 Détail des pièces</h3>
          <table border="1" cellPadding="5" style={{ width: '100%' }}>
            <thead>
              <tr>{Object.keys(data.filtered[0]).map(h => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {data.filtered.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((v, j) => <td key={j}>{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </main>
  )
}
