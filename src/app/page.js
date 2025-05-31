'use client'
import { useState } from 'react'

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/data`)
      const json = await res.json()
      setData(json)
    } catch (err) {
      console.error('Error fetching data:', err)
    }
    setLoading(false)
  }

  return (
    <main className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">📡 Connect to GCP Backend</h1>

      <button
        onClick={fetchData}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>

      {data && (
        <div className="overflow-auto mt-6">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-200">
              <tr>
                {data[0].map((header, index) => (
                  <th key={index} className="px-3 py-2 border">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex} className="even:bg-gray-100">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-3 py-2 border">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
