'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="p-10 space-y-4">
      <h1 className="text-2xl font-bold">📊 Google Sheets Viewer</h1>
      <p className="text-gray-600">Choisissez une feuille :</p>

      <div className="space-y-2">
        <Link href="/magasin" className="block text-blue-600 hover:underline">🗃️ Voir Magasin</Link>
        <Link href="/atelier" className="block text-blue-600 hover:underline">🔧 Voir Atelier</Link>
        <Link href="/reservation" className="block text-blue-600 hover:underline">📅 Voir Réservation</Link>
        <Link href="/multi" className="block text-blue-600 hover:underline">📋 Voir Multi</Link>
        <Link href="/add/magasin" className="block text-green-600 hover:underline">➕ Ajouter Magasin</Link>
      </div>
    </main>
  )
}
