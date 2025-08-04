const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
const db = require('./db/connections');
const bodyParser = require('body-parser');


const PORT = 3000;

app.listen(PORT, function () {
  console.log(`O express ta rodando na porta ${PORT}`)
});


// body parser
app.use(bodyParser.urlencoded({ extended: false }));

//handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));


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
  res.render('index')
});

//jobs routes
app.use('/jobs', require('./routes/jobs'));

