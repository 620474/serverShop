const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const connectToDB = require('./config/db')
connectToDB()

const productsRoutes =require('./routes/products-route')
const userRoutes = require('./routes/user-route')

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json())

app.use('/products', productsRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
   return res.send('hi')
})

app.listen(process.env.PORT||3000, () => {
    console.log(`http://localhost:3000`)
})
