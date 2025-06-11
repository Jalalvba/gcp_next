'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// The TypeScript 'type SheetData = ...' definition has been removed.

export default function MagasinPage() {
  // Type annotations like <boolean> and <string | null> have been removed from useState.
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        setError("API URL is not configured. Please set NEXT_PUBLIC_API_URL.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/api/magasin`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        // The type annotation for jsonData has been removed.
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) { // The type annotation for 'err' has been removed.
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) {
    return <div className="p-10">Loading data from Magasin sheet...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-500">Error: {error}</div>;
  }

  return (
    <main className="p-10 space-y-4">
      <Link href="/" className="text-blue-600 hover:underline">
        &larr; Back to Home
      </Link>
      <h1 className="text-2xl font-bold">🗃️ Magasin Sheet Data</h1>
      <p className="text-gray-600">Raw JSON response from the API:</p>

      <pre className="p-4 bg-gray-100 border rounded-md overflow-x-auto">
        <code>
          {/* The stringify function works the same in JS and TS */}
          {data && JSON.stringify(data, null, 2)}
        </code>
      </pre>
    </main>
  );
}