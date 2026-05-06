"use client";

import { useState, useEffect } from "react";

export default function SettingsPage() {

  const [company, setCompany] = useState({
    name: "",
    owner: "",
    vat: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    iban: ""
  });

  // 🔥 CARICA DATI SALVATI
  useEffect(() => {

    const saved =
      localStorage.getItem("companyData");

    if (saved) {
      setCompany(JSON.parse(saved));
    }

  }, []);

  // 💾 SALVA
  const saveSettings = () => {

    localStorage.setItem(
      "companyData",
      JSON.stringify(company)
    );

    alert("✅ Dati azienda salvati!");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-lg p-5 mb-5">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            {/* LOGO */}
            <div className="flex items-center gap-4">

              <img
                src="/logo.png?v=2"
                alt="Logo"
                className="w-20 h-20 object-contain"
              />

              <div>

                <h1 className="text-3xl md:text-4xl font-black text-slate-800">
                  Dati Azienda
                </h1>

                <p className="text-slate-500">
                  Configurazione intestazione preventivi
                </p>

              </div>

            </div>

            {/* MENU */}
            <div className="flex gap-2 flex-wrap">

              <a
                href="/"
                className="bg-slate-100 hover:bg-slate-200 transition px-4 py-3 rounded-xl font-medium"
              >
                🏠 Menu
              </a>

              <a
                href="/quotes"
                className="bg-slate-100 hover:bg-slate-200 transition px-4 py-3 rounded-xl font-medium"
              >
                📊 Preventivi
              </a>

              <a
                href="/materials"
                className="bg-slate-100 hover:bg-slate-200 transition px-4 py-3 rounded-xl font-medium"
              >
                ⚙️ Materiali
              </a>

            </div>

          </div>

        </div>

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            🏢 Informazioni Azienda
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              placeholder="Nome azienda"
              className="border p-4 rounded-2xl"
              value={company.name}
              onChange={(e) =>
                setCompany({
                  ...company,
                  name: e.target.value
                })
              }
            />

            <input
              placeholder="Titolare"
              className="border p-4 rounded-2xl"
              value={company.owner}
              onChange={(e) =>
                setCompany({
                  ...company,
                  owner: e.target.value
                })
              }
            />

            <input
              placeholder="Partita IVA"
              className="border p-4 rounded-2xl"
              value={company.vat}
              onChange={(e) =>
                setCompany({
                  ...company,
                  vat: e.target.value
                })
              }
            />

            <input
              placeholder="Telefono"
              className="border p-4 rounded-2xl"
              value={company.phone}
              onChange={(e) =>
                setCompany({
                  ...company,
                  phone: e.target.value
                })
              }
            />

            <input
              placeholder="Email"
              className="border p-4 rounded-2xl"
              value={company.email}
              onChange={(e) =>
                setCompany({
                  ...company,
                  email: e.target.value
                })
              }
            />

            <input
              placeholder="IBAN"
              className="border p-4 rounded-2xl"
              value={company.iban}
              onChange={(e) =>
                setCompany({
                  ...company,
                  iban: e.target.value
                })
              }
            />

          </div>

          <textarea
            placeholder="Indirizzo completo"
            className="border p-4 rounded-2xl w-full mt-4"
            value={company.address}
            onChange={(e) =>
              setCompany({
                ...company,
                address: e.target.value
              })
            }
          />

          <input
            placeholder="Città"
            className="border p-4 rounded-2xl w-full mt-4"
            value={company.city}
            onChange={(e) =>
              setCompany({
                ...company,
                city: e.target.value
              })
            }
          />

          {/* SAVE */}
          <button
            onClick={saveSettings}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-5 rounded-2xl mt-6 text-xl font-bold"
          >
            💾 Salva Dati Azienda
          </button>

        </div>

      </div>

    </div>
  );
}
