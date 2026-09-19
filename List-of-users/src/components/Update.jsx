import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${id}`).then(({ data }) => setForm(data)).catch(() => setError("Could not load this user."));
  }, [id]);

  const submit = async (event) => {
    event.preventDefault();
    try { await axios.put(`http://localhost:3000/users/${id}`, form); navigate("/"); } catch (requestError) { setError(requestError.response?.data?.message || "Could not update user."); }
  };

  return (
    <main className="form-page"><Link className="back-link" to="/">← Back to directory</Link><section className="form-panel"><p className="eyebrow">Edit contact</p><h1>Update user</h1><p className="subtitle">Keep this profile accurate and up to date.</p><form onSubmit={submit}><label>Name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label><label>Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label><label>Phone<input required value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label>{error && <p className="form-error">{error}</p>}<button className="primary-button" type="submit">Save changes</button></form></section></main>
  )
}

export default Update
