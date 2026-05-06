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

  // 📄 PDF PROFESSIONALE
  const printQuote = async (q) => {

    try {

      const settingsRes =
        await axios.get(
          `${API}/settings`
        );

      const s = settingsRes.data;

      const html = `
        <html>

        <head>

          <title>Preventivo</title>

          <style>

            body{
              font-family:Arial;
              padding:40px;
              color:#222;
            }

            .top{
              display:flex;
              justify-content:space-between;
              margin-bottom:40px;
              border-bottom:2px solid #ddd;
              padding-bottom:20px;
            }

            .title{
              font-size:34px;
              font-weight:bold;
              color:#0f172a;
            }

            .subtitle{
              color:#666;
              margin-top:5px;
            }

            .box{
              border:1px solid #ddd;
              padding:20px;
              border-radius:10px;
              margin-bottom:20px;
            }

            .section-title{
              font-size:20px;
              font-weight:bold;
              margin-bottom:10px;
            }

            table{
              width:100%;
              border-collapse:collapse;
              margin-top:20px;
            }

            th{
              background:#0f172a;
              color:white;
            }

            td,th{
              border:1px solid #ddd;
              padding:12px;
              text-align:left;
            }

            .total{
              text-align:right;
              margin-top:30px;
              font-size:28px;
              font-weight:bold;
            }

            .totals{
              margin-top:20px;
            }

            .totals div{
              display:flex;
              justify-content:space-between;
              margin-bottom:10px;
            }

          </style>

        </head>

        <body>

          <!-- HEADER -->
          <div class="top">

            <div>

              <div class="title">
                PREVENTIVO
              </div>

              <div class="subtitle">
                Officina Meccanica
              </div>

              <div style="margin-top:10px;">
                Data:
                ${new Date(q.createdAt)
                  .toLocaleDateString()}
              </div>

            </div>

            <div>

              <h2>
                ${s.companyName || ""}
              </h2>

              <div>
                ${s.owner || ""}
              </div>

              <div>
                ${s.address || ""}
              </div>

              <div>
                ${s.city || ""}
              </div>

              <div>
                P.IVA:
                ${s.vat || ""}
              </div>

              <div>
                SDI:
                ${s.sdi || ""}
              </div>

              <div>
                PEC:
                ${s.pec || ""}
              </div>

              <div>
                Tel:
                ${s.phone || ""}
              </div>

              <div>
                ${s.email || ""}
              </div>

              <div>
                IBAN:
                ${s.iban || ""}
              </div>

            </div>

          </div>

          <!-- CLIENTE -->
          <div class="box">

            <div class="section-title">
              Cliente
            </div>

            <div>
              <strong>
                ${q.client?.companyName ||
                  q.client?.name ||
                  ""}
              </strong>
            </div>

            <div>
              Referente:
              ${q.client?.contactName || ""}
            </div>

            <div>
              Indirizzo:
              ${q.client?.address || ""}
            </div>

            <div>
              Telefono:
              ${q.client?.phone || ""}
            </div>

            <div>
              Email:
              ${q.client?.email || ""}
            </div>

            <div>
              P.IVA:
              ${q.client?.vat || ""}
            </div>

            <div>
              Codice Fiscale:
              ${q.client?.fiscalCode || ""}
            </div>

            <div>
              SDI:
              ${q.client?.sdi || ""}
            </div>

            <div>
              PEC:
              ${q.client?.pec || ""}
            </div>

          </div>

          <!-- DESCRIZIONE -->
          <div class="box">

            <div class="section-title">
              Descrizione lavoro
            </div>

            <div>
              ${q.description || ""}
            </div>

          </div>

          <!-- TABELLA -->
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

          <!-- TOTALI -->
          <div class="totals">

            <div>
              <span>Subtotale</span>
              <span>
                € ${Number(q.subtotal).toFixed(2)}
              </span>
            </div>

            <div>
              <span>IVA</span>
              <span>
                € ${Number(q.ivaAmount).toFixed(2)}
              </span>
            </div>

          </div>

          <div class="total">

            Totale:
            € ${Number(q.total).toFixed(2)}

          </div>

        </body>

        </html>
      `;

      const win =
        window.open("", "_blank");

      win.document.write(html);

      win.document.close();

      win.print();

    } catch (err) {

      console.log(err);

      alert("Errore PDF");
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

                {/* MODIFICA */}
                <a
                  href={`/?edit=${q.id}`}
                  className="bg-orange-500 hover:bg-orange-600 transition text-white px-4 py-3 rounded-xl font-medium"
                >
                  ✏️ Modifica
                </a>

                {/* PDF */}
                <button
                  onClick={() => printQuote(q)}
                  className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-3 rounded-xl font-medium"
                >
                  📄 PDF
                </button>

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
