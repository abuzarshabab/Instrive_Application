const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan'); 
const dotEnv = require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const dbInstance = require('./database/connection');
const corsOptionsDelegate = require('./common/cors');

const PORT = process.env.WEB_SERVER_PORT || 3000;
const app = express();


app.use(cors(corsOptionsDelegate))
app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "example.com"],
      },
    },
  })
);
app.use(morgan('combined'));

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