"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [search, setSearch] = useState("");

  const loadQuotes = () => {
    axios
      .get("http://localhost:3001/quotes")
      .then((res) => setQuotes(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  // 🔍 filtro ricerca
  const filteredQuotes = quotes.filter((q) =>
    q.client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow rounded mt-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-4">
        📊 Dashboard Preventivi
      </h1>

      {/* NAV */}
      <div className="mb-4 flex gap-2">
        <Link href="/" className="bg-gray-200 px-3 py-1 rounded">
          ➕ Nuovo
        </Link>

        <Link href="/materials" className="bg-gray-200 px-3 py-1 rounded">
          ⚙️ Materiali
        </Link>
      </div>

      {/* SEARCH */}
      <input
        placeholder="🔍 Cerca cliente..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredQuotes.length === 0 && (
        <p>Nessun preventivo trovato</p>
      )}

      {filteredQuotes.map((q) => (
        <div
          key={q.id}
          className="border p-4 mb-4 rounded shadow"
        >
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between mb-2">
            <div>
              <b>{q.client.name}</b> <br />
              <span className="text-sm text-gray-500">
                {q.client.phone}
              </span>
  {/* 👇 DESCRIZIONE LAVORO */}
  <p className="text-sm mt-1 text-gray-600">
    {q.description}
  </p>
            </div>

            <div className="text-left md:text-right mt-2 md:mt-0">
              <b>€ {q.total.toFixed(2)}</b>
              <br />
              <span className="text-sm text-gray-500">
                {new Date(q.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* RIGHE */}
          <div className="mt-2">
            {q.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.name} ({item.qty} x €{item.price})
                </span>
                <span>€ {item.total.toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="mt-2 text-sm text-gray-600">
            Subtotale: € {q.subtotal.toFixed(2)} | IVA: €{" "}
            {q.ivaAmount.toFixed(2)}
          </div>

          {/* AZIONI */}
          <div className="mt-3 flex gap-2">

            {/* PDF */}
            <a
              href={`http://localhost:3001/quotes/${q.id}/pdf`}
              target="_blank"
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              📄 PDF
            </a>

            {/* DELETE */}
            <button
              onClick={async () => {
                if (!confirm("Eliminare questo preventivo?")) return;

                await axios.delete(
                  `http://localhost:3001/quotes/${q.id}`
                );

                loadQuotes();
              }}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              🗑 Elimina
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}