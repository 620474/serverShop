const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const connectToDB = require('./config/db')
connectToDB()

const productsRoutes =require('./routes/products-route')

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json())

app.use('/products', productsRoutes);

app.get('/', (req, res) => {
   return res.send('hi')
})

app.listen(3000, () => {
    console.log(`http://localhost:3000`)
})
