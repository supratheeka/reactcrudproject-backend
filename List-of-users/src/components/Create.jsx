import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/users", form);
      navigate("/");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not create user.");
    }
  };

  return (
    <main className="form-page"><Link className="back-link" to="/">← Back to directory</Link><section className="form-panel"><p className="eyebrow">New contact</p><h1>Add a user</h1><p className="subtitle">Create a complete profile for your directory.</p><form onSubmit={submit}><label>Name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Jane Smith" /></label><label>Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="jane@example.com" /></label><label>Phone<input required value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="+1 555 010 1011" /></label>{error && <p className="form-error">{error}</p>}<button className="primary-button" type="submit">Create user</button></form></section></main>
  )
}

export default Create
