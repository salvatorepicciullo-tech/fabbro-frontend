"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Materials() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    unit: "",
  });

  // CARICA MATERIALI
  const loadItems = () => {
    axios
      .get("http://localhost:3001/price-items")
      .then((res) => setItems(res.data));
  };

  useEffect(() => {
    loadItems();
  }, []);

  // CREA MATERIALE
  const addItem = async () => {
    if (!form.name || !form.price) return;

    await axios.post("http://localhost:3001/price-items", {
      name: form.name,
      price: parseFloat(form.price),
      unit: form.unit,
    });

    setForm({ name: "", price: "", unit: "" });
    loadItems();
  };

  // ELIMINA
  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:3001/price-items/${id}`);
    loadItems();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        ⚙️ Gestione Materiali
      </h1>

      {/* FORM */}
      <div className="flex gap-2 mb-4">
        <input
          placeholder="Nome"
          className="border p-2 w-full"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <input
          placeholder="Prezzo"
          type="number"
          className="border p-2 w-32"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />
        <input
          placeholder="Unità (kg, metro...)"
          className="border p-2 w-40"
          value={form.unit}
          onChange={(e) =>
            setForm({ ...form, unit: e.target.value })
          }
        />

        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-4"
        >
          + Aggiungi
        </button>
      </div>

      {/* LISTA */}
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between border p-2 mb-2"
        >
          <div>
            <b>{item.name}</b> — €{item.price}/{item.unit}
          </div>

          <button
            onClick={() => deleteItem(item.id)}
            className="bg-red-500 text-white px-2"
          >
            Elimina
          </button>
        </div>
      ))}
    </div>
  );
}