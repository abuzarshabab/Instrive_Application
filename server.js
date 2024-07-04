const express = require('express');
const bodyParser = require('body-parser');
const { dbInstance } = require('./database/connection')
const userRoutes = require('./routes/userRoutes');

require('dotenv').config()

const PORT = process.env.WEB_SERVER_PORT || 3000;
const app = express();

// TODO:  cors middleware
// TODO:  helmet middleware
// TODO: morgan middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/', (req, res) =>{
  res.json({ message: "Welcome to home page"})
})

app.use('/user', userRoutes)


dbInstance()

app.listen(PORT, () => {
  console.log(`Server is listening on localhost:${PORT}`)
})

process.on('uncoughtException', (exc) => {
  console.log(exc);
})