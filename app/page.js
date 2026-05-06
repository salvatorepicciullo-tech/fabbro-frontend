"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://fabbro-app.onrender.com";

export default function Home() {

  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);
  const [presetItems, setPresetItems] = useState([]);
  const [iva, setIva] = useState(22);
  const [loading, setLoading] = useState(false);

  const [client, setClient] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  // 🔥 CARICA MATERIALI
  useEffect(() => {
    axios
      .get(`${API}/price-items`)
      .then((res) => setPresetItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ➕ AGGIUNGI RIGA
  const addItem = () => {

    setItems([
      ...items,
      {
        name: "",
        qty: 1,
        price: 0,
        total: 0,
        type: "material"
      },
    ]);

  };

  // ✏️ AGGIORNA RIGA
  const updateItem = (index, field, value) => {

    const newItems = [...items];

    newItems[index][field] = value;

    newItems[index].total =
      Number(newItems[index].qty) *
      Number(newItems[index].price);

    setItems(newItems);
  };

  // ❌ ELIMINA RIGA
  const removeItem = (index) => {

    const newItems = [...items];

    newItems.splice(index, 1);

    setItems(newItems);
  };

  // 💰 TOTALI
  const subtotal = items.reduce(
    (acc, i) => acc + Number(i.total || 0),
    0
  );

  const ivaAmount = subtotal * (iva / 100);

  const total = subtotal + ivaAmount;

  // 💾 SALVA
  const saveQuote = async () => {

    if (!client.name) {
      alert("Inserisci nome cliente");
      return;
    }

    if (items.length === 0) {
      alert("Aggiungi almeno una riga");
      return;
    }

    setLoading(true);

    try {

      await axios.post(`${API}/quotes`, {
        client,
        items,
        ivaRate: iva,
        description
      });

      alert("✅ Preventivo salvato!");

      // RESET
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

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-gray-100 p-4">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow p-4 mb-4">

          <h1 className="text-3xl font-bold mb-3">
            🔧 Preventivo Fabbro
          </h1>

          <div className="flex gap-2 flex-wrap">

            <a
              href="/quotes"
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
              📊 Preventivi
            </a>

            <a
              href="/materials"
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
              ⚙️ Materiali
            </a>

          </div>

        </div>

        {/* CLIENTE */}
        <div className="bg-white rounded-2xl shadow p-4 mb-4">

          <h2 className="font-bold text-xl mb-3">
            👤 Cliente
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            <input
              placeholder="Nome cliente"
              className="border p-3 rounded-lg"
              value={client.name}
              onChange={(e) =>
                setClient({
                  ...client,
                  name: e.target.value
                })
              }
            />

            <input
              placeholder="Telefono"
              className="border p-3 rounded-lg"
              value={client.phone}
              onChange={(e) =>
                setClient({
                  ...client,
                  phone: e.target.value
                })
              }
            />

            <input
              placeholder="Email"
              className="border p-3 rounded-lg"
              value={client.email}
              onChange={(e) =>
                setClient({
                  ...client,
                  email: e.target.value
                })
              }
            />

            <input
              placeholder="Indirizzo"
              className="border p-3 rounded-lg"
              value={client.address}
              onChange={(e) =>
                setClient({
                  ...client,
                  address: e.target.value
                })
              }
            />

          </div>

          <textarea
            placeholder="Descrizione lavoro"
            className="border p-3 rounded-lg w-full mt-3"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

        </div>

        {/* MATERIALI */}
        <div className="bg-white rounded-2xl shadow p-4 mb-4">

          <div className="flex items-center justify-between mb-4">

            <h2 className="font-bold text-xl">
              🧱 Materiali / Lavorazioni
            </h2>

            <button
              onClick={addItem}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              + Riga
            </button>

          </div>

          <div className="space-y-3">

            {items.map((item, i) => (

              <div
                key={i}
                className="border rounded-xl p-3"
              >

                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">

                  {/* SELECT */}
                  <select
                    className="border p-3 rounded-lg"
                    onChange={(e) => {

                      const selected =
                        presetItems.find(
                          (p) => p.id == e.target.value
                        );

                      if (selected) {

                        updateItem(
                          i,
                          "name",
                          selected.name
                        );

                        updateItem(
                          i,
                          "price",
                          selected.price
                        );
                      }
                    }}
                  >

                    <option>
                      Seleziona materiale
                    </option>

                    {presetItems.map((p) => (

                      <option
                        key={p.id}
                        value={p.id}
                      >
                        {p.name}
                        {" "}
                        (€{p.price}/{p.unit})
                      </option>

                    ))}

                  </select>

                  {/* QTA */}
                  <input
                    type="number"
                    placeholder="Quantità"
                    className="border p-3 rounded-lg"
                    value={item.qty}
                    onChange={(e) =>
                      updateItem(
                        i,
                        "qty",
                        e.target.value
                      )
                    }
                  />

                  {/* PREZZO */}
                  <input
                    type="number"
                    placeholder="Prezzo"
                    className="border p-3 rounded-lg"
                    value={item.price}
                    onChange={(e) =>
                      updateItem(
                        i,
                        "price",
                        e.target.value
                      )
                    }
                  />

                  {/* TOTALE */}
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center font-bold">
                    € {Number(item.total).toFixed(2)}
                  </div>

                  {/* ELIMINA */}
                  <button
                    onClick={() => removeItem(i)}
                    className="bg-red-500 text-white rounded-lg p-3"
                  >
                    Elimina
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* TOTALI */}
        <div className="bg-white rounded-2xl shadow p-4 mb-4">

          <h2 className="font-bold text-xl mb-3">
            💰 Totali
          </h2>

          <div className="space-y-2">

            <div className="flex justify-between">
              <span>Subtotale</span>
              <span>
                € {subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center">

              <span>IVA</span>

              <select
                className="border p-2 rounded-lg"
                value={iva}
                onChange={(e) =>
                  setIva(+e.target.value)
                }
              >

                <option value={22}>
                  IVA 22%
                </option>

                <option value={10}>
                  IVA 10%
                </option>

                <option value={0}>
                  IVA 0%
                </option>

              </select>

            </div>

            <div className="flex justify-between">
              <span>Importo IVA</span>
              <span>
                € {ivaAmount.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-2xl font-bold border-t pt-3">
              <span>Totale</span>
              <span>
                € {total.toFixed(2)}
              </span>
            </div>

          </div>

        </div>

        {/* SALVA */}
        <button
          onClick={saveQuote}
          disabled={loading}
          className="w-full bg-green-600 text-white p-4 rounded-2xl text-xl font-bold"
        >

          {loading
            ? "Salvataggio..."
            : "💾 Salva Preventivo"}

        </button>

      </div>

    </div>
  );
}
