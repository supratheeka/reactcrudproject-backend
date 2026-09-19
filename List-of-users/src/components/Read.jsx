import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Read = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${id}`).then(({ data }) => setUser(data)).catch(() => setError("Could not load this user."));
  }, [id]);

  return (
    <main className="form-page"><Link className="back-link" to="/">← Back to directory</Link><section className="form-panel profile-panel"><p className="eyebrow">Contact profile</p>{error && <p className="form-error">{error}</p>}{user && <><span className="large-avatar">{user.name.charAt(0)}</span><h1>{user.name}</h1><p className="subtitle">User #{user.id}</p><dl><div><dt>Email</dt><dd>{user.email}</dd></div><div><dt>Phone</dt><dd>{user.phone}</dd></div></dl><Link className="primary-button" to={`/update/${user.id}`}>Edit profile</Link></>}</section></main>
  )
}

export default Read
