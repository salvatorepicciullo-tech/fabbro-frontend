"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://fabbro-app.onrender.com";

export default function SettingsPage() {

  const [data, setData] = useState({
    companyName: "",
    owner: "",
    vat: "",
    sdi: "",
    pec: "",
    phone: "",
    email: "",
    iban: "",
    address: "",
    city: ""
  });

  // LOAD
  useEffect(() => {
    axios
      .get(`${API}/settings`)
      .then((res) => {
        if (res.data) {
          setData(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // SAVE
  const saveData = async () => {

    try {

      await axios.post(
        `${API}/settings`,
        data
      );

      alert("✅ Dati azienda salvati");

    } catch (err) {
      console.log(err);
      alert("❌ Errore salvataggio");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      <div className="max-w-4xl mx-auto">

        {/* TOP */}
        <div className="bg-white rounded-3xl shadow p-6 mb-4">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <img
                src="/logo.png"
                alt="Logo"
                className="w-20 h-20 object-contain"
              />

              <div>
                <h1 className="text-4xl font-black">
                  🏢 Dati Azienda
                </h1>

                <p className="text-gray-500">
                  Configurazione intestazione preventivi
                </p>
              </div>

            </div>

            <a
              href="/"
              className="bg-gray-200 px-4 py-3 rounded-xl font-bold"
            >
              ← Menu
            </a>

          </div>

        </div>

        {/* FORM */}
        <div className="bg-white rounded-3xl shadow p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              placeholder="Nome azienda"
              className="border p-3 rounded-xl"
              value={data.companyName}
              onChange={(e) =>
                setData({
                  ...data,
                  companyName: e.target.value
                })
              }
            />

            <input
              placeholder="Titolare"
              className="border p-3 rounded-xl"
              value={data.owner}
              onChange={(e) =>
                setData({
                  ...data,
                  owner: e.target.value
                })
              }
            />

            <input
              placeholder="Partita IVA"
              className="border p-3 rounded-xl"
              value={data.vat}
              onChange={(e) =>
                setData({
                  ...data,
                  vat: e.target.value
                })
              }
            />

            <input
              placeholder="Codice SDI"
              className="border p-3 rounded-xl"
              value={data.sdi}
              onChange={(e) =>
                setData({
                  ...data,
                  sdi: e.target.value
                })
              }
            />

            <input
              placeholder="PEC"
              className="border p-3 rounded-xl"
              value={data.pec}
              onChange={(e) =>
                setData({
                  ...data,
                  pec: e.target.value
                })
              }
            />

            <input
              placeholder="Telefono"
              className="border p-3 rounded-xl"
              value={data.phone}
              onChange={(e) =>
                setData({
                  ...data,
                  phone: e.target.value
                })
              }
            />

            <input
              placeholder="Email"
              className="border p-3 rounded-xl"
              value={data.email}
              onChange={(e) =>
                setData({
                  ...data,
                  email: e.target.value
                })
              }
            />

            <input
              placeholder="IBAN"
              className="border p-3 rounded-xl"
              value={data.iban}
              onChange={(e) =>
                setData({
                  ...data,
                  iban: e.target.value
                })
              }
            />

          </div>

          <input
            placeholder="Indirizzo"
            className="border p-3 rounded-xl w-full mt-4"
            value={data.address}
            onChange={(e) =>
              setData({
                ...data,
                address: e.target.value
              })
            }
          />

          <input
            placeholder="Città"
            className="border p-3 rounded-xl w-full mt-4"
            value={data.city}
            onChange={(e) =>
              setData({
                ...data,
                city: e.target.value
              })
            }
          />

          <button
            onClick={saveData}
            className="w-full mt-6 bg-blue-600 text-white p-4 rounded-2xl text-xl font-bold"
          >
            💾 Salva Dati Azienda
          </button>

        </div>

      </div>

    </div>
  );
}
