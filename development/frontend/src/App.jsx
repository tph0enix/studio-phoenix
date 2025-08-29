import { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const api = import.meta.env.VITE_API_URL || "http://localhost:3000";
    fetch(`${api}/users`).then(r => r.json()).then(setUsers).catch(() => setUsers([]));
  }, []);
  return (
    <main style={{ padding: 24 }}>
      <h1>Studio Phoenix</h1>
      <p>Default homepage deployed on Vercel.</p>
      <h2>Users</h2>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </main>
  );
}