'use client'
import Link from 'next/link'

// The links array now only contains the single link you want to display.
const links = [
  { href: '/magasin', text: 'Voir Magasin', icon: '🗃️' },
];

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">📊 Magasin Sheets Viewer</h1>
          <p className="mt-2 text-gray-600">Cliquez sur le lien pour consulter la feuille :</p>
        </div>

        <nav>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="flex items-center justify-center w-full p-4 text-lg text-blue-600 transition-colors duration-200 rounded-md hover:bg-gray-100">
                  <span className="mr-3">{link.icon}</span>
                  <span>{link.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </main>
  )
}