'use client'
import { useEffect, useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function MagasinPage() {
  const [data, setData] = useState([])
  const [headers, setHeaders] = useState([])
  const [filter, setFilter] = useState('')
  const [column, setColumn] = useState('')

  useEffect(() => {
    fetch(`${API_URL}/api/magasin`)
      .then(res => res.json())
      .then(rows => {
        setHeaders(rows[0])
        setData(rows.slice(1))
      })
  }, [])

  const filtered = column && filter
    ? data.filter(row =>
        (row[headers.indexOf(column)] || '').toLowerCase().includes(filter.toLowerCase()))
    : data

  return (
    <main style={{ padding: '2rem' }}>
      <h1>📦 Magasin - Toutes les Pièces</h1>

      <div style={{ marginBottom: '1rem' }}>
        <select value={column} onChange={e => setColumn(e.target.value)}>
          <option value="">-- Choisir une colonne --</option>
          {headers.map(h => <option key={h} value={h}>{h}</option>)}
        </select>
        <input
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Filtrer..."
          style={{ marginLeft: '1rem', padding: '0.5rem' }}
        />
      </div>

      <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>{headers.map(h => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {filtered.map((row, i) => (
            <tr key={i}>
              {row.map((val, j) => <td key={j}>{val}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
