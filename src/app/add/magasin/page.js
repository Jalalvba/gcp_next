'use client'
import { useState } from 'react'

export default function AddMagasinPage() {
  const [header, setHeader] = useState({
    quotationId: '',
    client: '',
    phone: '',
    status: ''
  })

  const [rows, setRows] = useState([
    { partNumber: '', description: '', qty: 1 }
  ])

  const handleHeaderChange = (e) => {
    const { name, value } = e.target
    setHeader({ ...header, [name]: value })
  }

  const handleRowChange = (index, field, value) => {
    const updated = [...rows]
    updated[index][field] = value
    setRows(updated)
  }

  const addRow = () => {
    setRows([...rows, { partNumber: '', description: '', qty: 1 }])
  }

  const removeRow = (index) => {
    const updated = rows.filter((_, i) => i !== index)
    setRows(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // ✅ Prepare array as expected by backend
    const payload = rows.map(row => ({
      quotationId: header.quotationId,
      client: header.client,
      phone: header.phone,
      status: header.status,
      partNumber: row.partNumber,
      description: row.description,
      qty: row.qty
    }))

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/add/magasin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        alert('✅ Submitted successfully')
        setHeader({ quotationId: '', client: '', phone: '', status: '' })
        setRows([{ partNumber: '', description: '', qty: 1 }])
      } else {
        alert('❌ Submission failed')
      }
    } catch (err) {
      console.error(err)
      alert('❌ Server error')
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">📜 DEVIS AHLY (MAGASIN)</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Fields */}
        <table className="min-w-full border border-blue-600 text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">ID QUOTATION</th>
              <th className="px-4 py-2">CLIENT</th>
              <th className="px-4 py-2">PHONE NUMBERS</th>
              <th className="px-4 py-2">STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input name="quotationId" value={header.quotationId} onChange={handleHeaderChange} className="w-full px-2 py-1" placeholder="Add Quotation" required /></td>
              <td><input name="client" value={header.client} onChange={handleHeaderChange} className="w-full px-2 py-1" placeholder="Enter Client Name" required /></td>
              <td><input name="phone" value={header.phone} onChange={handleHeaderChange} className="w-full px-2 py-1" placeholder="Enter Phone" required /></td>
              <td>
                <select name="status" value={header.status} onChange={handleHeaderChange} className="w-full px-2 py-1" required>
                  <option value="">-- Select Status --</option>
                  <option value="draft">Draft</option>
                  <option value="pending">Pending</option>
                  <option value="validated">Validated</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Line Items */}
        <table className="min-w-full border border-blue-600 text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">PART NUMBER</th>
              <th className="px-4 py-2">DESCRIPTION</th>
              <th className="px-4 py-2">QTY-REQUESTED</th>
              <th className="px-4 py-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td><input value={row.partNumber} onChange={(e) => handleRowChange(index, 'partNumber', e.target.value)} className="w-full px-2 py-1" placeholder="Enter Part Number" required /></td>
                <td><input value={row.description} onChange={(e) => handleRowChange(index, 'description', e.target.value)} className="w-full px-2 py-1" placeholder="Enter Description" required /></td>
                <td><input type="number" value={row.qty} min={1} onChange={(e) => handleRowChange(index, 'qty', e.target.value)} className="w-full px-2 py-1" required /></td>
                <td className="text-center">
                  <button type="button" onClick={() => removeRow(index)} className="text-red-600">❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="button" onClick={addRow} className="bg-blue-600 text-white px-4 py-2 rounded">
          ➕ Add Row
        </button>

        <div>
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
            ✅ Submit to MAGASIN
          </button>
        </div>
      </form>
    </main>
  )
}
