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

  // 📄 PDF
  const printQuote = (q) => {

    const html = `
      <html>
      <head>
        <title>Preventivo</title>

        <style>
          body {
            font-family: Arial;
            padding: 30px;
          }

          h1 {
            margin-bottom: 20px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          td, th {
            border: 1px solid #ccc;
            padding: 10px;
          }

          .total {
            margin-top: 20px;
            font-size: 22px;
            font-weight: bold;
          }
        </style>
      </head>

      <body>

        <h1>Preventivo</h1>

        <h3>${q.client?.name}</h3>

        <p>
          ${q.client?.phone || ""}
          <br/>
          ${q.client?.email || ""}
          <br/>
          ${q.client?.address || ""}
        </p>

        <p>
          ${q.description || ""}
        </p>

        <table>

          <thead>
            <tr>
              <th>Descrizione</th>
              <th>Qta</th>
              <th>Prezzo</th>
              <th>Totale</th>
            </tr>
          </thead>

          <tbody>

            ${q.items.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>€ ${item.price}</td>
                <td>€ ${item.total}</td>
              </tr>
            `).join("")}

          </tbody>

        </table>

        <div class="total">
          Totale: € ${q.total.toFixed(2)}
        </div>

      </body>
      </html>
    `;

    const win = window.open("", "_blank");

    win.document.write(html);

    win.document.close();

    win.print();
  };

  return (

    <div className="min-h-screen bg-gray-100 p-4">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="bg-white shadow rounded-2xl p-4 mb-4 flex items-center justify-between">

          <h1 className="text-3xl font-bold">
            📊 Preventivi
          </h1>

          <a
            href="/"
            className="bg-gray-200 px-4 py-2 rounded-lg"
          >
            ← Home
          </a>

        </div>

        {/* LISTA */}
        <div className="space-y-4">

          {quotes.length === 0 && (

            <div className="bg-white rounded-2xl p-4 shadow">
              Nessun preventivo salvato
            </div>

          )}

          {quotes.map((q) => (

            <div
              key={q.id}
              className="bg-white rounded-2xl shadow p-4"
            >

              {/* TOP */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">

                <div>

                  <div className="text-xl font-bold">
                    {q.client?.name}
                  </div>

                  <div className="text-gray-500 text-sm">
                    {q.client?.phone}
                  </div>

                  <div className="text-gray-500 text-sm">
                    {q.client?.email}
                  </div>

                  <div className="text-gray-500 text-sm">
                    {q.client?.address}
                  </div>

                </div>

                <div className="text-right">

                  <div className="text-2xl font-bold">
                    € {Number(q.total).toFixed(2)}
                  </div>

                  <div className="text-sm text-gray-500">
                    {new Date(q.createdAt)
                      .toLocaleDateString()}
                  </div>

                </div>

              </div>

              {/* DESCRIZIONE */}
              {q.description && (

                <div className="mt-4 bg-gray-50 p-3 rounded-xl text-gray-700">
                  {q.description}
                </div>

              )}

              {/* RIGHE */}
              <div className="mt-4 space-y-2">

                {q.items?.map((item) => (

                  <div
                    key={item.id}
                    className="flex justify-between border-b pb-2 text-sm"
                  >

                    <div>
                      {item.name}
                      {" "}
                      ({item.qty} x €{item.price})
                    </div>

                    <div>
                      € {Number(item.total).toFixed(2)}
                    </div>

                  </div>

                ))}

              </div>

              {/* TOTALI */}
              <div className="mt-4 border-t pt-3 text-sm text-gray-600 space-y-1">

                <div className="flex justify-between">
                  <span>Subtotale</span>
                  <span>
                    € {Number(q.subtotal).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>IVA</span>
                  <span>
                    € {Number(q.ivaAmount).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between font-bold text-lg text-black">
                  <span>Totale</span>
                  <span>
                    € {Number(q.total).toFixed(2)}
                  </span>
                </div>

              </div>

              {/* BOTTONI */}
              <div className="flex gap-2 mt-4 flex-wrap">

                <button
                  onClick={() => printQuote(q)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  📄 PDF
                </button>

                <button
                  onClick={() => deleteQuote(q.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
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
