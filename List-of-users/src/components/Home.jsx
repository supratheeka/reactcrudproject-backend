import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch(() => {
        setError("Could not connect to the server. Make sure the backend is running.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();
    return `${user.name} ${user.email ?? ""} ${user.phone ?? ""}`.toLowerCase().includes(query);
  });

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setUsers((currentUsers) => currentUsers.filter((user) => user.id !== id));
    } catch {
      setError("Could not delete this user.");
    }
  };

  return (
    <main className="dashboard">
      <header className="topbar">
        <Link className="brand" to="/"><span className="brand-mark">LU</span><span>Listly</span></Link>
        <nav className="nav-links" aria-label="Main navigation"><Link className="active" to="/">Users</Link><Link to="/create">Add user</Link></nav>
      </header>
      <section className="page-heading">
        <div><p className="eyebrow">Workspace / Directory</p><h1>People, organized.</h1><p className="subtitle">Manage your contacts from one clear, simple place.</p></div>
        <Link className="primary-button" to="/create">+ Add user</Link>
      </section>
      <section className="stats" aria-label="Directory summary">
        <div className="stat-card"><span>Total users</span><strong>{users.length}</strong></div>
        <div className="stat-card"><span>Showing</span><strong>{filteredUsers.length}</strong></div>
        <div className="stat-card accent-stat"><span>Directory status</span><strong>{loading ? "Syncing" : "Live"}</strong></div>
      </section>
      <section className="directory-panel">
        <div className="panel-heading"><div><h2>User directory</h2><p>Browse and manage everyone in your workspace.</p></div><label className="search-box"><span aria-hidden="true">⌕</span><input type="search" placeholder="Search users..." value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search users" /></label></div>
        {error && <p className="message error-message">{error}</p>}
        {loading && <p className="message">Loading users...</p>}
        {!loading && !error && filteredUsers.length === 0 && <p className="message">No users match your search.</p>}
        {!loading && !error && filteredUsers.length > 0 && <div className="table-wrap"><table><thead><tr><th>Person</th><th>Email</th><th>Phone</th><th className="action-heading">Actions</th></tr></thead><tbody>
          {filteredUsers.map((user) => <tr key={user.id}><td><div className="person-cell"><span className="avatar">{user.name?.charAt(0).toUpperCase()}</span><span><strong>{user.name}</strong><small>ID #{user.id}</small></span></div></td><td>{user.email || "Not provided"}</td><td>{user.phone || "Not provided"}</td><td className="actions"><Link to={`/read/${user.id}`}>View</Link><Link to={`/update/${user.id}`}>Edit</Link><button type="button" onClick={() => deleteUser(user.id)}>Delete</button></td></tr>)}
        </tbody></table></div>}
      </section>
    </main>
  );
}

export default Home;