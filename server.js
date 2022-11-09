const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('./dist'));

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: './dist' });
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
