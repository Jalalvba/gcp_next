'use client'

import { useEffect, useState } from 'react'

export default function SheetViewer({ endpoint, title }) {
  const [data, setData] = useState(null)
  const [filteredData, setFilteredData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      console.log(`📡 Fetching from /api/${endpoint}`)
      setLoading(true)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}`)
        const json = await res.json()
        console.log('📦 Data:', json)
        setData(json)
        setFilteredData(json)
      } catch (err) {
        console.error('❌ Fetch error:', err)
        setData([])
        setFilteredData([])
      }
      setLoading(false)
    }

    fetchData()
  }, [endpoint])

  // 🔍 Filtering logic
  useEffect(() => {
    if (!data || !data.length) return

    if (search.trim() === '') {
      setFilteredData(data)
    } else {
      const lowered = search.toLowerCase()
      const filtered = data.filter(row =>
        row.some(cell => (cell || '').toString().toLowerCase().includes(lowered))
      )
      setFilteredData(filtered)
    }
  }, [search, data])

  return (
    <main className="p-4 sm:p-6 md:p-8 font-sans">
      <h1 className="text-xl md:text-2xl font-bold mb-4">{title}</h1>

      {/* 🔎 Search bar */}
      <input
        type="text"
        placeholder="🔍 Search in table..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md border px-3 py-2 mb-4 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-400"
      />

      {/* 🔁 Loading */}
      {loading && <p className="text-blue-500">⏳ Loading...</p>}

      {/* 📊 Table */}
      {filteredData && filteredData.length > 1 && (
        <div className="overflow-x-auto border rounded shadow-md">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                {filteredData[0].map((header, i) => (
                  <th key={i} className="border px-3 py-2 whitespace-nowrap font-semibold">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(1).map((row, rowIdx) => (
                <tr key={rowIdx} className="even:bg-gray-50 hover:bg-yellow-50 transition">
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="border px-3 py-1 whitespace-pre-wrap break-words">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🚫 No results */}
      {filteredData && filteredData.length <= 1 && !loading && (
        <p className="text-red-500 mt-4">🔍 No matching results</p>
      )}

      {/* ❌ Load failure */}
      {!filteredData && !loading && (
        <p className="text-red-500 mt-4">⚠️ Failed to load data</p>
      )}
    </main>
  )
}
