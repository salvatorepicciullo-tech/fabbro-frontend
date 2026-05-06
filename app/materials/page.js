"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://fabbro-app.onrender.com";

export default function Materials() {
  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    unit: "",
  });

  // 🔥 CARICA MATERIALI
  const loadItems = () => {
    axios
      .get(`${API}/price-items`)
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadItems();
  }, []);

  // ➕ CREA MATERIALE
  const addItem = async () => {
    if (!form.name || !form.price) {
      alert("Inserisci nome e prezzo");
      return;
    }

    try {
      await axios.post(`${API}/price-items`, {
        name: form.name,
        price: parseFloat(form.price),
        unit: form.unit,
      });

      setForm({
        name: "",
        price: "",
        unit: "",
      });

      loadItems();

    } catch (err) {
      console.error(err);
      alert("Errore salvataggio materiale");
    }
  };

  // ❌ ELIMINA
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API}/price-items/${id}`);
      loadItems();
    } catch (err) {
      console.error(err);
      alert("Errore eliminazione");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          ⚙️ Gestione Materiali
        </h1>

        <a
          href="/"
          className="bg-gray-200 px-4 py-2 rounded-lg"
        >
          ← Home
        </a>
      </div>

      {/* FORM */}
      <div className="bg-white shadow rounded-2xl p-4 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

          <input
            placeholder="Nome materiale"
            className="border p-3 rounded-lg"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Prezzo"
            type="number"
            className="border p-3 rounded-lg"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <input
            placeholder="Unità (metro, kg...)"
            className="border p-3 rounded-lg"
            value={form.unit}
            onChange={(e) =>
              setForm({ ...form, unit: e.target.value })
            }
          />

          <button
            onClick={addItem}
            className="bg-blue-600 text-white rounded-lg p-3 font-semibold"
          >
            + Aggiungi
          </button>

        </div>
      </div>

      {/* LISTA */}
      <div className="space-y-3">

        {items.length === 0 && (
          <div className="bg-white p-4 rounded-xl shadow text-gray-500">
            Nessun materiale inserito
          </div>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          >

            <div>
              <div className="font-bold text-lg">
                {item.name}
              </div>

              <div className="text-gray-600">
                € {item.price} / {item.unit}
              </div>
            </div>

            <button
              onClick={() => deleteItem(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Elimina
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}
