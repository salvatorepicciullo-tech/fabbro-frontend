"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://fabbro-app.onrender.com";

export default function QuotesPage() {

  const [quotes, setQuotes] = useState([]);

  // 🔥 CARICA
  const loadQuotes = () => {

    axios
      .get(`${API}/quotes`)
      .then((res) => setQuotes(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  // ❌ ELIMINA
  const deleteQuote = async (id) => {

    if (!confirm("Eliminare preventivo?"))
      return;

    try {

      await axios.delete(
        `${API}/quotes/${id}`
      );

      loadQuotes();

    } catch (err) {

      console.error(err);

      alert("Errore eliminazione");
    }
  };

  return (

    <div className="min-h-screen bg-slate-100 p-4">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="bg-white shadow-lg rounded-3xl p-5 mb-5">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className="flex items-center gap-4">

              <img
                src="/logo.png?v=1"
                alt="Logo"
                className="w-16 h-16 object-contain"
              />

              <div>

                <h1 className="text-4xl font-black text-slate-800">
                  📊 Preventivi
                </h1>

                <p className="text-slate-500">
                  Gestione preventivi officina
                </p>

              </div>

            </div>

            {/* MENU */}
            <div className="flex gap-2 flex-wrap">

              <a
                href="/"
                className="bg-slate-100 hover:bg-slate-200 transition px-4 py-3 rounded-xl font-medium"
              >
                🏠 Home
              </a>

              <a
                href="/materials"
                className="bg-slate-100 hover:bg-slate-200 transition px-4 py-3 rounded-xl font-medium"
              >
                ⚙️ Materiali
              </a>

              <a
                href="/settings"
                className="bg-blue-600 hover:bg-blue-700 text-white transition px-4 py-3 rounded-xl font-medium"
              >
                🏢 Ditta
              </a>

            </div>

          </div>

        </div>

        {/* LISTA */}
        <div className="space-y-5">

          {quotes.length === 0 && (

            <div className="bg-white rounded-3xl p-6 shadow">
              Nessun preventivo salvato
            </div>

          )}

          {quotes.map((q) => (

            <div
              key={q.id}
              className="bg-white rounded-3xl shadow-lg p-5"
            >

              {/* TOP */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">

                {/* CLIENTE */}
                <div>

                  <div className="text-2xl font-bold text-slate-800">
                    {q.client?.companyName ||
                      q.client?.name ||
                      "Cliente"}
                  </div>

                  {q.client?.contactName && (
                    <div className="text-slate-500">
                      Referente:
                      {" "}
                      {q.client.contactName}
                    </div>
                  )}

                  {q.client?.vat && (
                    <div className="text-slate-500 text-sm">
                      P.IVA:
                      {" "}
                      {q.client.vat}
                    </div>
                  )}

                  {q.client?.phone && (
                    <div className="text-slate-500 text-sm">
                      {q.client.phone}
                    </div>
                  )}

                  {q.client?.email && (
                    <div className="text-slate-500 text-sm">
                      {q.client.email}
                    </div>
                  )}

                  {q.client?.address && (
                    <div className="text-slate-500 text-sm">
                      {q.client.address}
                    </div>
                  )}

                </div>

                {/* TOTALE */}
                <div className="text-right">

                  <div className="text-3xl font-black text-slate-800">
                    €
                    {" "}
                    {Number(q.total).toFixed(2)}
                  </div>

                  <div className="text-slate-500 text-sm">
                    {new Date(
                      q.createdAt
                    ).toLocaleDateString()}
                  </div>

                </div>

              </div>

              {/* DESCRIZIONE */}
              {q.description && (

                <div className="mt-5 bg-slate-50 rounded-2xl p-4 text-slate-700">
                  {q.description}
                </div>

              )}

              {/* MATERIALI */}
              <div className="mt-5 space-y-2">

                {q.items?.map((item) => (

                  <div
                    key={item.id}
                    className="flex justify-between border-b border-slate-100 pb-2 text-sm"
                  >

                    <div>
                      {item.name}
                      {" "}
                      ({item.qty} x €
                      {item.price})
                    </div>

                    <div className="font-semibold">
                      €
                      {" "}
                      {Number(item.total).toFixed(2)}
                    </div>

                  </div>

                ))}

              </div>

              {/* TOTALI */}
              <div className="mt-5 border-t pt-4 space-y-2 text-sm">

                <div className="flex justify-between text-slate-600">
                  <span>Subtotale</span>

                  <span>
                    €
                    {" "}
                    {Number(q.subtotal).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>IVA</span>

                  <span>
                    €
                    {" "}
                    {Number(q.ivaAmount).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-2xl font-black text-slate-800 border-t pt-3">

                  <span>Totale</span>

                  <span>
                    €
                    {" "}
                    {Number(q.total).toFixed(2)}
                  </span>

                </div>

              </div>

              {/* BOTTONI */}
              <div className="flex gap-2 mt-5 flex-wrap">

                {/* PDF */}
                <a
                  href={`${API}/quotes/${q.id}/pdf`}
                  target="_blank"
                  className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-3 rounded-xl font-medium"
                >
                  📄 PDF
                </a>

                {/* ELIMINA */}
                <button
                  onClick={() => deleteQuote(q.id)}
                  className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-3 rounded-xl font-medium"
                >
                  ❌ Elimina
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}
