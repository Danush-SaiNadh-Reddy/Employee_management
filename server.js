const jsonServer = require('json-server');
const path = require('path');
const express = require('express');
const app = express();
const router = jsonServer.router('d.json');
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use('/api', router);

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
