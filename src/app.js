const path = require('path')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const router = require('./routes/index')

const { sucess } = require('./controllers/rest/response')


const app = express();

app.use(express.static(path.join(__dirname, '../', 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use(router);

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || 'Internal Server Error')
})

app.use((req, res) => {
  res.status(404).send('Not Found')
})

app.locals.res = { sucess }


module.exports = app