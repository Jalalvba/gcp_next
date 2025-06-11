import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          📊 <span>Magasin Sheets Viewer</span>
        </h1>
        <p>Cliquez sur un lien pour consulter :</p>

        <div className="flex flex-col space-y-2">
          <Link href="/magasin" className="text-blue-600 hover:underline flex items-center gap-2">
            💾 Voir Magasin
          </Link>

          <Link href="/analyse" className="text-green-600 hover:underline flex items-center gap-2">
            🤖 Analyse par AI
          </Link>
        </div>
      </div>
    </main>
  )
}
