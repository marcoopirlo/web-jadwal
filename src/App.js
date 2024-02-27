import React, { useState } from "react";

const initialItems = [
  { id: 1, description: "Senin", quantity: 1, packed: false },
  { id: 2, description: "Selasa", quantity: 2, packed: false },
  { id: 3, description: "Rabu", quantity: 3, packed: false },
  { id: 4, description: "Kamis", quantity: 4, packed: false },
  { id: 5, description: "Jumat", quantity: 5, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleUpdateItem(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1>JADWAL PELAJARAN SEKOLAH</h1>
    </div>
  );
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      // quantity: 1,
      packed: false,
    };

    onAddItems(newItem);
    setDescription("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Jadwal Pelajaran Buku Dari Senin - Jumat </h3>
      <input
        type="text"
        placeholder="Buku pelajaran yang dibawa"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Bawa</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onUpdateItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onUpdateItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onUpdateItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>Delete</button>
    </li>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        !!! JANGAN LUPA LIAT JADWAL INI YAAA BIAR NANTI KALO DI SEKOLAH GA
        KETINGGALAN !!!
      </em>
    </footer>
  );
}
