const express = require ("express");
const mongoose = require ("mongoose");
const connectToDatabase = require ('./src/config.js');
const cors = require ("cors");
const dotenv = require ("dotenv");
const { swaggerUi, swaggerSpec }= require ('./src/swagger.js')


dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use ('/api/v1/auth', require ('./routes/auth'));
app.use ('/api/v1/user', require('./routes/user'))

app.use ('/api/v1/contactUs', require ('./routes/contactUs'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




const PORT = 4000

app.listen (PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

connectToDatabase();
