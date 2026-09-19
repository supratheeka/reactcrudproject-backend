const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [
    { id: 1, name: "John", email: "John@gmail.com", phone: "+1 555 010 1001" },
    { id: 2, name: "Mary", email: "Mary@gmail.com", phone: "+1 555 010 1002" },
    { id: 3, name: "David", email: "David@gmail.com", phone: "+1 555 010 1003" },
    { id: 4, name: "Olivia", email: "Olivia@gmail.com", phone: "+1 555 010 1004" },
    { id: 5, name: "James", email: "James@gmail.com", phone: "+1 555 010 1005" },
    { id: 6, name: "Sophia", email: "Sophia@gmail.com", phone: "+1 555 010 1006" },
    { id: 7, name: "Michael", email: "Michael@gmail.com", phone: "+1 555 010 1007" },
    { id: 8, name: "Emma", email: "Emma@gmail.com", phone: "+1 555 010 1008" },
    { id: 9, name: "William", email: "William@gmail.com", phone: "+1 555 010 1009" },
    { id: 10, name: "Ava", email: "Ava@gmail.com", phone: "+1 555 010 1010" }
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((item) => item.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

app.post("/users", (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) return res.status(400).json({ message: "Name, email, and phone are required" });
  const user = { id: users.length ? Math.max(...users.map((item) => item.id)) + 1 : 1, name, email, phone };
  users.push(user);
  res.status(201).json(user);
});

app.put("/users/:id", (req, res) => {
  const index = users.findIndex((item) => item.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: "User not found" });
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) return res.status(400).json({ message: "Name, email, and phone are required" });
  users[index] = { id: users[index].id, name, email, phone };
  res.json(users[index]);
});

app.delete("/users/:id", (req, res) => {
  const originalLength = users.length;
  users = users.filter((item) => item.id !== Number(req.params.id));
  if (users.length === originalLength) return res.status(404).json({ message: "User not found" });
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});