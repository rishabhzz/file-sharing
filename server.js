const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const registeredUsers = [];

app.get('/', (req, res) => {
  const userList = registeredUsers.map(user => user.name);
  res.send(`<h1>Network Users</h1><ul>${userList.map(user => `<li>${user}</li>`).join('')}</ul>`);
});

app.post('/register', (req, res) => {
  const { name } = req.body;
  if (name) {
    registeredUsers.push({ name });
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Name is required.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
