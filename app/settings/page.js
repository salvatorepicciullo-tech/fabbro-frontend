"use client";

import { useState } from "react";

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

  const saveSettings = () => {

    localStorage.setItem(
      "companyData",
      JSON.stringify(company)
    );

    alert("✅ Dati ditta salvati!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <div className="flex items-center gap-4 mb-6">

            <img
              src="/logo.png?v=1"
              alt="Logo"
              className="w-20 h-20 object-contain"
            />

            <div>
              <h1 className="text-3xl font-black">
                Dati Azienda
              </h1>

              <p className="text-gray-500">
                Configurazione intestazione preventivi
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              placeholder="Nome azienda"
              className="border p-3 rounded-xl"
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
              className="border p-3 rounded-xl"
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
              className="border p-3 rounded-xl"
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
              className="border p-3 rounded-xl"
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
              className="border p-3 rounded-xl"
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
              className="border p-3 rounded-xl"
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
            className="border p-3 rounded-xl w-full mt-4"
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
            className="border p-3 rounded-xl w-full mt-4"
            value={company.city}
            onChange={(e) =>
              setCompany({
                ...company,
                city: e.target.value
              })
            }
          />

          <button
            onClick={saveSettings}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl mt-6 text-lg font-bold"
          >
            💾 Salva Dati Azienda
          </button>

        </div>

      </div>

    </div>
  );
}
