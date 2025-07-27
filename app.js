const express = require('express');
const app = express();
const db = require('./db/connections');
const bodyParser = require('body-parser');

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`O express ta rodando na porta ${PORT}`)
});


// body parser
app.use(bodyParser.urlencoded({ extended: false }));


// db connection
db
  .authenticate()
  .then(() => {
    console.log('Conectou ao banco com sucesso');
  })
  .catch(err => {
    console.log("Ocorreu um erro ao conectar", err);
  })


// routes
app.get('/', (req, res) => {
  res.send('Está funcionando 3');
});

//jobs routes
app.use('/jobs', require('./routes/jobs'));

