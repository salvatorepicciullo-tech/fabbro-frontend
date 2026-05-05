"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);
  const [presetItems, setPresetItems] = useState([]);
  const [iva, setIva] = useState(22);

  const [client, setClient] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  // 🔥 CARICA MATERIALI
  useEffect(() => {
    axios
      .get("http://localhost:3001/price-items")
      .then((res) => setPresetItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ➕ AGGIUNGI RIGA
  const addItem = () => {
    setItems([
      ...items,
      { name: "", qty: 1, price: 0, total: 0 },
    ]);
  };

  // ✏️ AGGIORNA RIGA
  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    newItems[index].total =
      newItems[index].qty * newItems[index].price;
    setItems(newItems);
  };

  // 💰 CALCOLI
  const subtotal = items.reduce((acc, i) => acc + i.total, 0);
  const ivaAmount = subtotal * (iva / 100);
  const total = subtotal + ivaAmount;

  // 💾 SALVA
  const saveQuote = async () => {
    try {
      await axios.post("http://localhost:3001/quotes", {
        client,
        items,
        ivaRate: iva,
        description
      });

      alert("✅ Preventivo salvato!");

      // 🔥 RESET COMPLETO CORRETTO
      setItems([]);
      setDescription("");
      setClient({
        name: "",
        phone: "",
        email: "",
        address: ""
      });

    } catch (err) {
      console.error(err);
      alert("❌ Errore salvataggio");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded mt-6">

      {/* TITOLO */}
      <h1 className="text-2xl font-bold mb-4">
        🔧 Preventivo Fabbro
      </h1>

      {/* NAV */}
      <div className="mb-4 flex gap-2">
        <a href="/quotes" className="bg-gray-200 px-3 py-1 rounded">
          📊 Preventivi
        </a>

        <a href="/materials" className="bg-gray-200 px-3 py-1 rounded">
          ⚙️ Materiali
        </a>
      </div>

      {/* CLIENTE */}
      <div className="mb-4 flex flex-col gap-2">

        <input
          placeholder="Nome cliente"
          className="border p-2 w-full"
          value={client.name || ""}
          onChange={(e) =>
            setClient({ ...client, name: e.target.value })
          }
        />

        <input
          placeholder="Telefono"
          className="border p-2 w-full"
          value={client.phone || ""}
          onChange={(e) =>
            setClient({ ...client, phone: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="border p-2 w-full"
          value={client.email || ""}
          onChange={(e) =>
            setClient({ ...client, email: e.target.value })
          }
        />

        <input
          placeholder="Indirizzo"
          className="border p-2 w-full"
          value={client.address || ""}
          onChange={(e) =>
            setClient({ ...client, address: e.target.value })
          }
        />

        <textarea
          placeholder="Descrizione lavoro (es: Cancello ferro zincato con installazione)"
          className="border p-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* ADD */}
      <button
        onClick={addItem}
        className="bg-blue-500 text-white px-4 py-2 mb-4"
      >
        + Aggiungi Riga
      </button>

      {/* RIGHE */}
      {items.map((item, i) => (
        <div
          key={i}
          className="flex flex-col md:flex-row gap-2 mb-2"
        >
          <select
            className="border p-2 w-full"
            onChange={(e) => {
              const selected = presetItems.find(
                (p) => p.id == e.target.value
              );

              if (selected) {
                updateItem(i, "name", selected.name);
                updateItem(i, "price", selected.price);
              }
            }}
          >
            <option>Seleziona materiale</option>
            {presetItems.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (€{p.price}/{p.unit})
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Qta"
            className="border p-2 w-full md:w-24"
            value={item.qty}
            onChange={(e) =>
              updateItem(i, "qty", +e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Prezzo"
            className="border p-2 w-full md:w-28"
            value={item.price}
            onChange={(e) =>
              updateItem(i, "price", +e.target.value)
            }
          />

          <div className="p-2 w-full md:w-28 bg-gray-100 text-center">
            € {item.total.toFixed(2)}
          </div>
        </div>
      ))}

      {/* IVA */}
      <div className="mt-4">
        <select
          className="border p-2"
          value={iva}
          onChange={(e) => setIva(+e.target.value)}
        >
          <option value={22}>IVA 22%</option>
          <option value={10}>IVA 10%</option>
          <option value={0}>IVA 0%</option>
        </select>
      </div>

      {/* TOTALI */}
      <div className="mt-4">
        <p>Subtotale: € {subtotal.toFixed(2)}</p>
        <p>IVA: € {ivaAmount.toFixed(2)}</p>
        <p className="font-bold text-xl">
          Totale: € {total.toFixed(2)}
        </p>
      </div>

      {/* SALVA */}
      <button
        onClick={saveQuote}
        className="bg-green-600 text-white px-6 py-2 mt-4"
      >
        💾 Salva Preventivo
      </button>
    </div>
  );
}